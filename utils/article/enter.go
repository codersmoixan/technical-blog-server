package article

import (
	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system"
	"technical-blog-server/model/system/article"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
)

type ArticleBindUser struct {
	article.ArticleBindUser
	UserIsEmpty bool `json:"userIsEmpty"`
}

func GetArticleBindUserParams(c *gin.Context) ArticleBindUser{
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)
	userId := utils.GetUserId(c)
	params := ArticleBindUser{
		UserIsEmpty: len(userId) == 0,
	}
	params.ArticleId = byId.ID
	params.UserId = userId

	return params
}

func GetFormatReply(list []article.SysArticleReply, userList []system.SysUser) []responseParam.ArticleReplyResponse {
	replyList := make([]responseParam.ArticleReplyResponse, len(list))
	lo.ForEach(list, func(reply article.SysArticleReply, index int) {
		replyUserInfo, _ := lo.Find(userList, func(u system.SysUser) bool {
			return u.UserId == reply.ReplyUserId
		})
		replyToUserInfo, _ := lo.Find(userList, func(u system.SysUser) bool {
			return u.UserId == reply.ReplyToUserId
		})
		replyList[index].ReplyId = reply.ReplyId
		replyList[index].ReplyInfo = reply
		replyList[index].ReplyUserInfo = replyUserInfo
		replyList[index].ReplyToUserInfo = replyToUserInfo
	})

	return replyList
}
