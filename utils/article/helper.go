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

type FormatReplyParams struct {
	ReplyList []article.SysArticleReply
	UserList []system.SysUser
	ParentReplyList []article.SysArticleReply
	Article responseParam.ArticleDetail
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

func GetFormatReply(listObj FormatReplyParams) []responseParam.ArticleReplyResponse {
	list := listObj.ReplyList
	userList := listObj.UserList
	parentReplyList := listObj.ParentReplyList
	articleInfo := listObj.Article

	replyList := make([]responseParam.ArticleReplyResponse, len(list))
	lo.ForEach(list, func(reply article.SysArticleReply, index int) {
		if replyUserInfo, isFind := lo.Find(userList, func(u system.SysUser) bool {
			return u.UserId == reply.ReplyUserId
		}); isFind {
			replyList[index].IsAuthor = reply.ReplyUserId == articleInfo.AuthorId
			replyList[index].ReplyUserInfo = &replyUserInfo
		}
		if replyToUserInfo, isFind := lo.Find(userList, func(u system.SysUser) bool {
			return u.UserId == reply.ReplyToUserId
		}); isFind {
			replyList[index].ReplyToUserInfo = &replyToUserInfo
		}
		replyList[index].ReplyId = reply.ReplyId
		replyList[index].ReplyInfo = &reply

		if len(parentReplyList) != 0 {
			if parentList, isFind := lo.Find(parentReplyList, func(item article.SysArticleReply) bool {
				return reply.ReplyToReplyId == item.ReplyId
			}); isFind {
				replyList[index].ParentReply = &parentList
			}
		}

	})

	return replyList
}
