package article

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system/article"
	"technical-blog-server/utils"
)

type ArticleBindUser struct {
	article.ArticleBindUser
	UserIsEmpty bool `json:"userIsEmpty"`
}

func GetArticleBindUserParams(c *gin.Context) ArticleBindUser{
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)
	userId := utils.GetUserID(c)
	params := ArticleBindUser{
		UserIsEmpty: userId == 0,
	}
	params.ArticleId = byId.String()
	params.UserId = userId

	return params
}
