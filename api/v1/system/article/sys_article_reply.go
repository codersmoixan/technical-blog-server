package article

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"technical-blog-server/global"
	requestParam "technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/system/article"
	"technical-blog-server/model/system/request"
	"technical-blog-server/utils"
	"technical-blog-server/utils/verify"
)

type ReplyApi struct {}

func replyLikedFailed(c *gin.Context, err error) {
	global.TB_LOG.Error("点赞失败!", zap.Error(err))
	response.FailWithMessage("点赞失败!", c)
}

// GetReplyList
// @Tags 文章评论回复管理
// @Summary 获取回复列表
// @Description 获取回复列表
// @Param page query int true "当前页"
// @Param pageSize query int true "每页请求数量"
// @Param keyWord query string false "搜索内容"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/reply/list [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ReplyApi) GetReplyList(c *gin.Context) {
	var replyParams struct{
		requestParam.PageInfo
		request.GetReplyListIds
	}
	var idVerify = verify.Rules{"ArticleId": {verify.NotEmpty()}, "ReplyCommentId": {verify.NotEmpty()}}
	_ = c.ShouldBindJSON(&replyParams)

	if err := verify.Verify(replyParams, utils.MergeMaps[string, []string](idVerify, verify.PageInfoVerify)); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	replyList, total, err := articleReplyService.GetReplyList(request.GetReplyListIds{
		ArticleId: replyParams.ArticleId,
		ReplyCommentId: replyParams.ReplyCommentId,
	}, requestParam.PageInfo{
		Page: replyParams.Page,
		PageSize: replyParams.PageSize,
	})
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	response.OkWithDetailed(response.PageResult{
		List: replyList,
		Page: replyParams.Page,
		PageSize: replyParams.PageSize,
		Total: total,
	}, "OK", c)
}

// AddReply
// @Tags 文章评论回复管理
// @Summary 添加回复
// @Description 添加回复
// @Accept json
// @Produce json
// @Param data body article.SysArticleReply true "回复信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/reply/add [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ReplyApi) AddReply(c *gin.Context) {
	var replyParams article.SysArticleReply
	_ = c.ShouldBindJSON(&replyParams)

	if err := verify.Verify(replyParams, verify.ArticleReplyVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	id := utils.GenerateIntStringUUID()
	userId := utils.GetUserId(c)
	replyParams.ReplyId = id
	replyParams.ReplyUserId = userId

	reply, err := articleReplyService.AddReply(replyParams)
	if err != nil {
		response.FailWithMessage("回复提交失败!", c)
		return
	}

	response.OkWithDetailed(reply, "提交回复成功!", c)
}

// DeleteReply
// @Tags 文章评论回复管理
// @Summary 删除回复
// @Description 删除回复
// @Accept json
// @Produce json
// @Param data body article.SysArticleReply true "回复信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/reply [delete]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ReplyApi) DeleteReply(c *gin.Context) {
	var byId requestParam.GetById
	_ = c.ShouldBindQuery(&byId)

	if err := verify.Verify(byId, verify.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if err := articleReplyService.DeleteReply(byId.ID); err != nil {
		global.TB_LOG.Error("删除回复失败!", zap.Error(err))
		response.FailWithMessage("删除回复失败!", c)
	} else {
		response.OkWithDetailed(true, "删除回复成功!", c)
	}
}

// SaveReplyLiked
// @Tags 文章评论回复管理
// @Summary 回复点赞
// @Description 回复点赞
// @Accept json
// @Produce json
// @Param data body article.SysArticleReplyLiked true "回复点赞信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/reply/liked/save [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ReplyApi) SaveReplyLiked(c *gin.Context) {
	var likedParams article.SysArticleReplyLiked
	_ = c.ShouldBindJSON(&likedParams)
	likedParams.UserId = utils.GetUserId(c)

	if err := verify.Verify(likedParams, verify.ArticleReplyLikedVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	// 查询该用户是否已经点赞
	list, _ := articleReplyLikedService.GetUserLiked(likedParams)
	// 如果有点赞记录将不再点赞
	if len(list) != 0 {
		// 记录是否为软删除
		isDelete := list[0].DeletedAt.Valid
		if !isDelete {
			response.FailWithMessage("用户已点赞，无法再次点赞!", c)
			return
		}

		// 如果点赞记录是软删除的，重置deleted_at为空
		if err := articleReplyLikedService.ResetReplyLikedDeletedAt(likedParams); err != nil {
			replyLikedFailed(c, err)
			return
		}
	} else {
		if err := articleReplyLikedService.AddLikedRecord(likedParams); err != nil {
			replyLikedFailed(c, err)
			return
		}
	}

	if err := articleReplyLikedService.UpdateReplyLiked(likedParams, 1); err != nil {
		replyLikedFailed(c, err)
		return
	}

	response.OkWithDetailed("OK", "点赞成功!", c)
}

// CancelReplyLiked
// @Tags 文章评论回复管理
// @Summary 回复取消点赞
// @Description 回复取消点赞
// @Accept json
// @Produce json
// @Param data body article.SysArticleReplyLiked true "取消回复信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/reply/liked/cancel [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ReplyApi) CancelReplyLiked(c *gin.Context) {
	var likedParams article.SysArticleReplyLiked
	_ = c.ShouldBindJSON(&likedParams)
	likedParams.UserId = utils.GetUserId(c)

	if err := verify.Verify(likedParams, verify.ArticleReplyLikedVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	list, _ := articleReplyLikedService.GetUserLiked(likedParams)
	if len(list) == 0 || (len(list) != 0 && list[0].DeletedAt.Valid) {
		response.FailWithMessage("未点赞，不能取消点赞!", c)
		return
	}

	if err := articleReplyLikedService.CancelLikedRecord(likedParams); err != nil {
		response.FailWithMessage("取消失败!", c)
		global.TB_LOG.Error("取消失败!", zap.Error(err))
		return
	}

	if err := articleReplyLikedService.UpdateReplyLiked(likedParams, -1); err != nil {
		response.FailWithMessage("取消失败!", c)
		global.TB_LOG.Error("取消失败!", zap.Error(err))
		return
	}

	response.OkWithDetailed("OK", "取消成功!", c)
}

// GetReplyLikedRecord
// @Tags 文章评论回复管理
// @Summary 获取文章回复点赞记录
// @Description 获取文章回复点赞记录
// @Param articleId query string true "文章id"
// @Success 200 {string json "{"code": 200, "msg": "", "data": ""}"
// @Router /article/reply/liked/record [get]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ReplyApi) GetReplyLikedRecord(c *gin.Context) {
	var byId requestParam.GetById
	_ = c.ShouldBindQuery(&byId)

	if list, err := articleReplyLikedService.GetReplyLikedList(byId.ID); err != nil {
		response.FailWithMessage("查询失败!", c)
		global.TB_LOG.Error(err.Error())
		return
	} else {
		response.OkWithDetailed(list, "查询成功", c)
	}
}
