package system

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type UserRouter struct{}

// SetupUserRouter
// @author: zhengji.su
// @description: 初始化用户路由
// @param: Router *gin.RouterGroup
func (s *UserRouter) SetupUserRouter(Router *gin.RouterGroup) {
	userRouter := Router.Group("user")
	userApi := v1.ApiGroupApp.SystemApiGroup.UserApi
	{
		userRouter.GET("list", userApi.GetUserList)
	}
}
