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
	articleCommentApi := v1.ApiGroupApp.SystemApiGroup.ArticleCommentApi
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
		articleRouter.POST("comment/submit", articleCommentApi.SubmitComment)
	}
}

func (article *ArticleRouter) SetupGuestArticleRouter(Router *gin.RouterGroup)  {
	articleRouter := Router.Group("")
	articleApi := v1.ApiGroupApp.SystemApiGroup.ArticleApi
	articleViewsApi := v1.ApiGroupApp.SystemApiGroup.ArticleViewsApi
	articleCommentApi := v1.ApiGroupApp.SystemApiGroup.ArticleCommentApi
	{
		articleRouter.GET("article/list", articleApi.GetArticleList)
		articleRouter.GET("article", articleApi.GetArticleById)
		// 请求文章详情时会自动调用，无需再次手动调用
		articleRouter.POST("article/views/record", articleViewsApi.RecordViews)
		articleRouter.POST("article/comment/list", articleCommentApi.GetCommentList)
	}
}
