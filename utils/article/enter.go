package article

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/model/common/request"
	articleRequest "technical-blog-server/model/system/request"
	"technical-blog-server/utils"
)

func GetArticleLikedParams(c *gin.Context) articleRequest.ArticleLikedRequest {
	var byId request.GetById
	var likedParam articleRequest.ArticleLikedRequest
	_ = c.ShouldBindQuery(&byId)
	userId := utils.GetUserUuid(c)
	likedParam.ArticleId = byId.ID
	likedParam.UserId = userId

	return likedParam
}
