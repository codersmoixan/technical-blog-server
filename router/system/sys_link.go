package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type LinkRouter struct{}

// SetupLinkRouter
// @author: zhengji.su
// @description: 初始化友情链接路由
// @param: Router *gin.RouterGroup
func (l *LinkRouter) SetupLinkRouter(Router *gin.RouterGroup) {
	linkRouter := Router.Group("link")
	linkApi := v1.ApiGroupApp.SystemApiGroup.LinkApi
	{
		linkRouter.POST("add", linkApi.AddLink)
		linkRouter.PUT("update", linkApi.UpdateLink)
		linkRouter.DELETE("delete", linkApi.DeleteLink)
	}
}
