package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type ArticleRouter struct{}

// SetupArticleRouter
// @author: zhengji.su
// @description: 初始化文章路由
// @param: Router *gin.RouterGroup
func (article *ArticleRouter) SetupArticleRouter(Router *gin.RouterGroup) {
	articleRouter := Router.Group("article")
	articleApi := v1.ApiGroupApp.SystemApiGroup.ArticleApi
	articleLikedApi := v1.ApiGroupApp.SystemApiGroup.ArticleLikedApi
	articleFavorApi := v1.ApiGroupApp.SystemApiGroup.ArticleFavorApi
	articleViewsApi := v1.ApiGroupApp.SystemApiGroup.ArticleViewsApi
	{
		articleRouter.POST("add", articleApi.AddArticle)
		articleRouter.PUT("update", articleApi.UpdateArticle)
		articleRouter.DELETE("delete", articleApi.DeleteArticle)
		articleRouter.POST("liked/save", articleLikedApi.SaveLiked)
		articleRouter.POST("liked/cancel", articleLikedApi.CancelLiked)
		articleRouter.GET("liked/is", articleLikedApi.GetUserIsLiked)
		articleRouter.POST("favor/save", articleFavorApi.SaveFavor)
		articleRouter.POST("favor/cancel", articleFavorApi.CancelFavor)
		articleRouter.GET("favor/is", articleFavorApi.GetUserIsFavor)
		articleRouter.POST("views/record", articleViewsApi.RecordViews)
	}
}
