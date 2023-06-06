package article

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system/article"
	"technical-blog-server/utils"
)

type ArticleBindUser struct {
	article.ArticleBindUser
	UserUintId uint `json:"userUintId"`
	UserIsEmpty bool `json:"userIsEmpty"`
}

func GetArticleBindUserParams(c *gin.Context) ArticleBindUser{
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)
	userId := utils.GetUserUuid(c)
	userUintId := utils.GetUserID(c)
	params := ArticleBindUser{
		UserUintId: userUintId,
		UserIsEmpty: userUintId == 0,
	}
	params.ArticleId = byId.ID
	params.UserId = userId

	return params
}
