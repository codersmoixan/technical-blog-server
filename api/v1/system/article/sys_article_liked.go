package article

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/system"
	articleRequest "technical-blog-server/model/system/request"
	"technical-blog-server/utils"
)

func (a *ArticleApi) SaveLiked(c *gin.Context) {
	var byId request.GetById
	var likedParam articleRequest.ArticleLikedRequest
	_ = c.ShouldBindQuery(&byId)
	_ = c.ShouldBindJSON(&likedParam)
	likedParam.Id = byId.ID

	if err := utils.Verify(likedParam, utils.ArticleLikedVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	var like = &system.SysArticleLiked{
		ArticleId: likedParam.Id,
		UserId: likedParam.UserId,
	}
	_, err := articleService.AddLikedRecord(*like)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	article, er := articleService.SaveLiked(likedParam.Id)
	if er != nil {
		response.FailWithMessage(er.Error(), c)
		return
	}

	response.OkWithDetailed(article, "OK", c)
}

func (a *ArticleApi) CancelLiked(c *gin.Context) {
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)

	if err := utils.Verify(byId, utils.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
}
