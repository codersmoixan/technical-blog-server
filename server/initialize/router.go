package initialize

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/router"
)

// Routers 初始化总路由
func Routers() *gin.Engine {
	Router := gin.Default()
	systemRouter := router.RouterGroupApp.System

	PrivateGroup := Router.Group("")
	{
		systemRouter.SetupUserRouter(PrivateGroup)
	}

	return Router
}
