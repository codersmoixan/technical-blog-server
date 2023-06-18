package article

import (
	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
	"go.uber.org/zap"
	"technical-blog-server/global"
	requestParam "technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/system/article"
	"technical-blog-server/model/system/request"
	"technical-blog-server/utils"
	articleUtils "technical-blog-server/utils/article"
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
	var idVerify = utils.Rules{"ArticleId": {utils.NotEmpty()}, "ReplyCommentId": {utils.NotEmpty()}}
	_ = c.ShouldBindJSON(&replyParams)

	if err := utils.Verify(replyParams, utils.MergeMaps[string, []string](idVerify, utils.PageInfoVerify)); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	list, total, err := articleReplyService.GetReplyList(request.GetReplyListIds{
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

	userIds := lo.Reduce[article.SysArticleReply, []string](list, func(agg []string, item article.SysArticleReply, index int) []string {
		if lo.IndexOf(agg, item.ReplyUserId) == -1 {
			agg = append(agg, item.ReplyUserId)
		}
		if lo.IndexOf(agg, item.ReplyToReplyId) == -1 {
			agg = append(agg, item.ReplyToReplyId)
		}
		return agg
	}, make([]string, 0))

	userList, _ := userService.GetUserByIds(userIds)

	replyList := articleUtils.GetFormatReply(list, userList)

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

	if err := utils.Verify(replyParams, utils.ArticleReplyVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	id := utils.GenerateIntStringUUID()
	userId := utils.GetUserId(c)
	replyParams.ReplyId = id
	replyParams.ReplyUserId = userId

	if err := articleReplyService.AddReply(replyParams); err != nil {
		global.TB_LOG.Error("回复提交失败!", zap.Error(err))
		response.FailWithMessage("回复提交失败!", c)
		return
	}

	response.OkWithDetailed(true, "提交回复成功!", c)
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

	if err := utils.Verify(byId, utils.IdVerify); err != nil {
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

	if err := utils.Verify(likedParams, utils.ArticleReplyLikedVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	// 查询该用户是否已经点赞
	list, _ := articleReplyService.GetUserLiked(likedParams)
	// 如果有点赞记录将不再点赞
	if len(list) != 0 {
		// 记录是否为软删除
		isDelete := list[0].DeletedAt.Valid
		if !isDelete {
			response.FailWithMessage("用户已点赞，无法再次点赞!", c)
			return
		}

		// 如果点赞记录是软删除的，重置deleted_at为空
		if err := articleReplyService.ResetReplyLikedDeletedAt(likedParams); err != nil {
			replyLikedFailed(c, err)
			return
		}
	} else {
		if err := articleReplyService.AddLikedRecord(likedParams); err != nil {
			replyLikedFailed(c, err)
			return
		}
	}

	if err := articleReplyService.UpdateReplyLiked(likedParams, 1); err != nil {
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

	if err := utils.Verify(likedParams, utils.ArticleReplyLikedVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	list, _ := articleReplyService.GetUserLiked(likedParams)
	if len(list) == 0 || (len(list) != 0 && list[0].DeletedAt.Valid) {
		response.FailWithMessage("未点赞，不能取消点赞!", c)
		return
	}

	if err := articleReplyService.CancelLikedRecord(likedParams); err != nil {
		response.FailWithMessage("取消失败!", c)
		global.TB_LOG.Error("取消失败!", zap.Error(err))
		return
	}

	if err := articleReplyService.UpdateReplyLiked(likedParams, -1); err != nil {
		response.FailWithMessage("取消失败!", c)
		global.TB_LOG.Error("取消失败!", zap.Error(err))
		return
	}

	response.OkWithDetailed("OK", "取消成功!", c)
}
