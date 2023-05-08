package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type BaseRouter struct{}

func (b *BaseRouter) SetupBaseRouter(Router *gin.RouterGroup) {
	baseRouter := Router.Group("")
	userApi := v1.ApiGroupApp.SystemApiGroup.UserApi
	blogApi := v1.ApiGroupApp.SystemApiGroup.BlogApi
	categoryApi := v1.ApiGroupApp.SystemApiGroup.CategoryApi
	linkApi := v1.ApiGroupApp.SystemApiGroup.LinkApi
	tagApi := v1.ApiGroupApp.SystemApiGroup.TagApi
	{
		baseRouter.POST("login", userApi.Login)
		baseRouter.POST("register", userApi.Register)
	}
	{
		baseRouter.GET("blog/list", blogApi.GetBlogList)
		baseRouter.GET("blog/:id", blogApi.GetBlogById)
	}
	{
		baseRouter.GET("category/:id", categoryApi.GetCategoryById)
		baseRouter.GET("category/list", categoryApi.GetCategoryList)
	}
	{
		baseRouter.GET("link/list", linkApi.GetLinkList)
	}
	{
		baseRouter.GET("tag/:id", tagApi.GetTagById)
		baseRouter.GET("tag/list", tagApi.GetTagList)
	}
}
