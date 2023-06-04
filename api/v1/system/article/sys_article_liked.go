package article

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/system"
	response_param "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
	articleUtils "technical-blog-server/utils/article"
)

// SaveLiked
// @Tags 文章管理
// @Summary 文章点赞
// @Description 文章点赞
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/liked/save [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ArticleApi) SaveLiked(c *gin.Context) {
	likedParam := articleUtils.GetArticleLikedParams(c)

	if err := utils.Verify(likedParam, utils.ArticleLikedVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	var like = &system.SysArticleLiked{
		ArticleId: likedParam.ArticleId,
		UserId: likedParam.UserId,
	}
	_, err := articleService.AddLikedRecord(*like)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	article, er := articleService.SaveLiked(likedParam.ArticleId)
	if er != nil {
		response.FailWithMessage(er.Error(), c)
		return
	}

	response.OkWithDetailed(article, "OK", c)
}

// CancelLiked
// @Tags 文章管理
// @Summary 文章取消点赞
// @Description 文章取消点赞
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/liked/cancel [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ArticleApi) CancelLiked(c *gin.Context) {
	likedParam := articleUtils.GetArticleLikedParams(c)

	if err := utils.Verify(likedParam, utils.ArticleLikedVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	var like = system.SysArticleLiked{
		ArticleId: likedParam.ArticleId,
		UserId: likedParam.UserId,
	}
	_, err := articleService.DeleteLikedRecord(like)

	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	article, err := articleService.CancelLiked(likedParam.ArticleId)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	response.OkWithDetailed(article, "OK", c)
}

// GetUserIsLiked
// @Tags Base
// @Summary 文章是否已经点赞
// @Description 文章是否已经点赞
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/liked/is [get]
// @author: zhengji.su
// @param: c *gin.Context
func (api *ArticleApi) GetUserIsLiked(c *gin.Context) {
	likedParam := articleUtils.GetArticleLikedParams(c)
	if err := utils.Verify(likedParam, utils.ArticleLikedVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	list, _ := articleService.GetUserIsLiked(likedParam.UserId)

	response.OkWithDetailed(response_param.ArticleIsLikedResponse{
		IsLiked: len(list) != 0,
	}, "OK", c)
}
