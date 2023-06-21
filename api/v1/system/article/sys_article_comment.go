package article

import (
	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/system"
	"technical-blog-server/model/system/article"
	request2 "technical-blog-server/model/system/request"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
	articleUtils "technical-blog-server/utils/article"
)

type CommentApi struct {}
type CommentIds struct {
	userIds []string
	commentIds []string
}

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

	list, total, err := articleCommentService.GetCommentList(byId.ID, pageInfo)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		global.TB_LOG.Error("评论获取失败!", zap.Error(err))
		return
	}

	var commentIds CommentIds
	lo.ForEach(list, func(item article.SysArticleComment, index int) {
		if lo.IndexOf(commentIds.userIds, item.UserId) == -1 {
			commentIds.userIds = append(commentIds.userIds, item.UserId)
		}
		if item.ReplyCount > 0 {
			commentIds.commentIds = append(commentIds.commentIds, item.CommentId)
		}
	})

	// 获取用户信息
	userList, _ := userService.GetUserByIds(commentIds.userIds)
	// 获取评论回复列表
	replyList, _ := articleReplyService.GetGroupReply(request2.GetReplyGroupIds{
		ArticleId: byId.ID,
		ReplyCommentIds: commentIds.commentIds,
	}, 2)

	commentList := make([]responseParam.ArticleCommentResponse, len(list))
	lo.ForEach(list, func(comment article.SysArticleComment, index int) {
		userInfo, _ := lo.Find(userList, func(u system.SysUser) bool {
			return u.UserId == comment.UserId
		})
		filterReplyList := lo.Filter(replyList, func(item article.SysArticleReply, index int) bool {
			return item.ReplyCommentId == comment.CommentId
		})
		replyInfos := articleUtils.GetFormatReply(filterReplyList, userList)
		commentList[index].CommentId = comment.CommentId
		commentList[index].UserInfo = userInfo
		commentList[index].CommentInfo = comment
		commentList[index].ReplyInfos = replyInfos
	})

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

	if err := utils.Verify(commentParams, utils.ArticleCommentVerify); err != nil {
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
