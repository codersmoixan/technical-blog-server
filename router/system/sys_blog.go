package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type BlogRouter struct{}

// SetupBlogRouter
// @author: zhengji.su
// @description: 初始化博客路由
// @param: Router *gin.RouterGroup
func (b *BlogRouter) SetupBlogRouter(Router *gin.RouterGroup) {
	blogRouter := Router.Group("blog")
	blogApi := v1.ApiGroupApp.SystemApiGroup.BlogApi
	{
		blogRouter.GET("/:id", blogApi.GetBlogById)
		blogRouter.GET("list", blogApi.GetBlogList)
		blogRouter.POST("add", blogApi.AddBlog)
		blogRouter.PUT("update", blogApi.UpdateBlog)
		blogRouter.DELETE("delete", blogApi.DeleteBlog)
	}
}
