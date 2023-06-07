package article

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/system/article"
	requestParams "technical-blog-server/model/system/request"
	"technical-blog-server/utils"
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

	if err := utils.Verify(byId, utils.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	commentList, err := articleCommentService.GetCommentList(byId.ID, pageInfo)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		global.TB_LOG.Error("评论获取失败!", zap.Error(err))
		return
	}

	response.OkWithDetailed(commentList, "评论获取成功!", c)
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
	var commentParams requestParams.ArticleCommentRequest
	_ = c.ShouldBindJSON(&commentParams)
	commentParams.UserId = utils.GetUserID(c)

	if err := utils.Verify(commentParams, utils.ArticleCommentVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if _, err := userService.GetUserById(commentParams.TargetId); err != nil {
		response.FailWithDetailed(nil, "查找用户失败!", c)
		global.TB_LOG.Error("评论提交失败!", zap.Error(err))
		return
	}

	articleComment := &article.SysArticleComment{
		ArticleId: commentParams.ArticleId,
		UserId: commentParams.UserId,
		Content: commentParams.Content,
		ParentId: commentParams.ParentId,
		TargetId: commentParams.TargetId,
	}

	if comment, err := articleCommentService.SubmitComment(*articleComment); err != nil {
		response.FailWithMessage(err.Error(), c)
		global.TB_LOG.Error("评论提交失败!", zap.Error(err))
	} else {
		response.OkWithDetailed(comment, "评论提交成功!", c)
	}
}
