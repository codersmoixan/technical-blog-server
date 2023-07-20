package article

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/system/article"
	"technical-blog-server/utils"
	"technical-blog-server/utils/verify"
)

type CommentApi struct {}

// GetCommentList
// @Tags 文章评论管理
// @Summary 获取评论列表
// @Description 获取评论列表
// @Param page query int true "当前页"
// @Param pageSize query int true "每页请求数量"
// @Param keyWord query string false "搜索内容"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/comment/list [get]
// @author: zhengji.su
// @param: c *gin.Context
func (api *CommentApi) GetCommentList(c *gin.Context) {
	var byId request.GetById
	var pageInfo request.PageInfo
	_ = c.ShouldBindQuery(&byId)
	_ = c.ShouldBindJSON(&pageInfo)

	if err := verify.Verify(byId, verify.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	commentList, total, err := articleCommentService.GetCommentList(byId.ID, pageInfo)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	response.OkWithDetailed(response.PageResult{
		List: commentList,
		Total: total,
		Page: pageInfo.Page,
		PageSize: pageInfo.PageSize,
	}, "评论获取成功!", c)
}

// SubmitComment
// @Tags 文章评论管理
// @Summary 提交评论
// @Description 提交评论
// @Param articleId query string true "文章id"
// @Param targetId query string true "回复目标id"
// @Param content query string true "回复内容"
// @Param parentId query string false "答主id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/comment/submit [get]
// @author: zhengji.su
// @param: c *gin.Context
func (api *CommentApi) SubmitComment(c *gin.Context) {
	var commentParams article.SysArticleComment
	_ = c.ShouldBindJSON(&commentParams)
	commentParams.UserId = utils.GetUserId(c)
	commentParams.CommentId = utils.GenerateIntStringUUID()

	if err := verify.Verify(commentParams, verify.ArticleCommentVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if comment, err := articleCommentService.SubmitComment(commentParams); err != nil {
		response.FailWithMessage(err.Error(), c)
		global.TB_LOG.Error("评论提交失败!", zap.Error(err))
	} else {
		response.OkWithDetailed(comment, "评论提交成功!", c)
	}
}

// SaveCommentLiked
// @Tags 文章评论管理
// @Summary 评论点赞
// @Description 评论点赞
// @Accept json
// @Produce json
// @Param data body article.SysArticleReplyLiked true "回复点赞信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/reply/liked/save [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *CommentApi) SaveCommentLiked(c *gin.Context) {
	var commentLikedParams article.SysArticleCommentLiked
	_ = c.ShouldBindJSON(&commentLikedParams)
	commentLikedParams.UserId = utils.GetUserId(c)

	if err := verify.Verify(commentLikedParams, verify.ArticleCommentLikedVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	// 查询该用户是否已经点赞
	list, _ := articleCommentLikedService.GetUserLiked(commentLikedParams)
	if len(list) != 0 {
		// 记录是否为软删除
		isDelete := list[0].DeletedAt.Valid
		if !isDelete {
			response.FailWithMessage("用户已点赞，无法再次点赞!", c)
			return
		}

		// 如果点赞记录是软删除的，重置deleted_at为空
		if err := articleCommentLikedService.ResetCommentLikedDeletedAt(commentLikedParams); err != nil {
			replyLikedFailed(c, err)
			return
		}
	} else {
		if err := articleCommentLikedService.AddLikedRecord(commentLikedParams); err != nil {
			replyLikedFailed(c, err)
			return
		}
	}

	if err := articleCommentLikedService.UpdateCommentLiked(commentLikedParams, 1); err != nil {
		replyLikedFailed(c, err)
		return
	}

	response.OkWithDetailed("OK", "点赞成功!", c)
}

// GetCommentLikedRecord
// @Tags 文章评论管理
// @Summary 获取文章评论点赞记录
// @Description 获取文章评论点赞记录
// @Param id query string true "文章id"
// @Success 200 {string json "{"code": 200, "msg": "", "data": ""}"
// @Router /article/comment/liked/record [get]
// @author: zhengji.su
// @param: c *gin.Context
func (api *CommentApi) GetCommentLikedRecord(c *gin.Context) {
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)

	if list, err := articleCommentLikedService.GetCommentLikedList(byId.ID); err != nil {
		response.FailWithMessage("查询失败!", c)
		global.TB_LOG.Error(err.Error())
		return
	} else {
		response.OkWithDetailed(list, "查询成功", c)
	}
}
