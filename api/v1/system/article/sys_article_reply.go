package article

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
	"go.uber.org/zap"
	"technical-blog-server/global"
	requestParam "technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/system"
	"technical-blog-server/model/system/article"
	"technical-blog-server/model/system/request"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
)

type ReplyApi struct {}

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

	list, err := articleReplyService.GetReplyList(request.GetReplyListIds{
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

	fmt.Println(userIds, 1253)

	userList, _ := userService.GetUserByIds(userIds)

	replyList := make([]responseParam.ArticleReplyResponse, len(list))
	lo.ForEach(list, func(reply article.SysArticleReply, index int) {
		replyUserInfo, _ := lo.Find(userList, func(u system.SysUser) bool {
			return u.UserId == reply.ReplyUserId
		})
		replyToUserInfo, _ := lo.Find(userList, func(u system.SysUser) bool {
			return u.UserId == reply.ReplyToUserId
		})
		replyList[index].ReplyInfo = reply
		replyList[index].ReplyUserInfo = replyUserInfo
		replyList[index].ReplyToUserInfo = replyToUserInfo
	})

	response.OkWithDetailed(replyList, "OK", c)
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

	if err := utils.Verify(replyParams, utils.ArticleReplyVefify); err != nil {
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
// @Router /article/reply/add [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ReplyApi) DeleteReply(c *gin.Context) {

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

}
