package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type BaseRouter struct{}

// SetupBaseRouter
// @author: zhengji.su
// @description: 初始化通用路由
// @param: Router *gin.RouterGroup
func (s *BaseRouter) SetupBaseRouter(Router *gin.RouterGroup) {
	baseRouter := Router.Group("base")
	baseApi := v1.ApiGroupApp.SystemApiGroup.BaseApi
	{
		baseRouter.POST("login", baseApi.Login)
	}
}
