package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type TagRouter struct{}

func (t *TagRouter) SetupTagsRouter(Router *gin.RouterGroup) {
	tagRouter := Router.Group("tags")
	tagApi := v1.ApiGroupApp.SystemApiGroup.TagApi
	{
		tagRouter.GET("list", tagApi.GetTagList)
		tagRouter.POST("add", tagApi.AddTag)
		tagRouter.DELETE("delete", tagApi.DeleteTag)
		tagRouter.PUT("update", tagApi.UpdateTag)
	}
}
