package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type BlogRouter struct{}

func (b *BlogRouter) SetupBlogsRouter(Router *gin.RouterGroup) {
	blogRouter := Router.Group("blogs")
	blogApi := v1.ApiGroupApp.SystemApiGroup.BlogApi
	{
		blogRouter.GET("list", blogApi.GetBlogList)
		blogRouter.PUT("add", blogApi.AddBlog)
		blogRouter.PUT("update", blogApi.UpdateBlog)
		blogRouter.DELETE("delete", blogApi.DeleteBlog)
	}
}
