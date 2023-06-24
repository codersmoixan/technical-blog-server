package article

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/model/common/response"
	responseParam "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
	articleUtils "technical-blog-server/utils/article"
)

type FavorApi struct {}

// SaveFavor
// @Tags 文章收藏管理
// @Summary 文章收藏
// @Description 文章收藏
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/favor/save [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *FavorApi)SaveFavor(c *gin.Context) {
	favorParams := articleUtils.GetArticleBindUserParams(c)

	if err := utils.Verify(favorParams, utils.ArticleBindUserVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	article, er := articleFavorService.SaveFavor(favorParams)
	if er != nil {
		response.FailWithMessage(er.Error(), c)
		return
	}

	response.OkWithDetailed(article, "OK", c)
}

// CancelFavor
// @Tags 文章收藏管理
// @Summary 文章取消收藏
// @Description 文章取消收藏
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/favor/cancel [post]
// @author: zhengji.su
// @param: c *gin.Context
func (api *FavorApi)CancelFavor(c *gin.Context)  {
	favorParams := articleUtils.GetArticleBindUserParams(c)

	if err := utils.Verify(favorParams, utils.ArticleBindUserVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	article, err := articleFavorService.CancelFavor(favorParams)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	response.OkWithDetailed(article, "OK", c)
}

// GetUserIsFavor
// @Tags 文章收藏管理
// @Summary 文章是否已经收藏
// @Description 文章是否已经收藏
// @Param id query string true "id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /article/favor/is [get]
// @author: zhengji.su
// @param: c *gin.Context
func (api *FavorApi)GetUserIsFavor(c *gin.Context)  {
	favorParam := articleUtils.GetArticleBindUserParams(c)
	if err := utils.Verify(favorParam, utils.ArticleBindUserVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	list, _ := articleFavorService.GetUserFavor(favorParam.UserId)

	response.OkWithDetailed(responseParam.ArticleIsFavorResponse{
		IsFavor: len(list) != 0,
	}, "OK", c)
}
