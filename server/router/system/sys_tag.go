package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type TagRouter struct{}

// SetupTagRouter
// @author: zhengji.su
// @description: 初始化标签路由
// @param: Router *gin.RouterGroup
func (t *TagRouter) SetupTagRouter(Router *gin.RouterGroup) {
	tagRouter := Router.Group("tag")
	tagApi := v1.ApiGroupApp.SystemApiGroup.TagApi
	{
		tagRouter.GET("list", tagApi.GetTagList)
		tagRouter.POST("add", tagApi.AddTag)
		tagRouter.DELETE("delete", tagApi.DeleteTag)
		tagRouter.PUT("update", tagApi.UpdateTag)
	}
}
