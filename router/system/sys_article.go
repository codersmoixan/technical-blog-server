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
	{
		articleRouter.POST("add", articleApi.AddArticle)
		articleRouter.PUT("update", articleApi.UpdateArticle)
		articleRouter.DELETE("delete", articleApi.DeleteArticle)
		articleRouter.POST("liked/save", articleApi.SaveLiked)
		articleRouter.POST("liked/cancel", articleApi.CancelLiked)
	}
}
