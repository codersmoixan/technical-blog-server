package initialize

import (
	"github.com/gin-gonic/gin"
	"technical-blog-server/global"
	"technical-blog-server/router"
)

// Routers 初始化总路由
func Routers() *gin.Engine {
	Router := gin.Default()
	systemRouter := router.RouterGroupApp.System

	PrivateGroup := Router.Group("")
	{
		systemRouter.SetupBaseRouter(PrivateGroup)
		systemRouter.SetupUserRouter(PrivateGroup)
		systemRouter.SetupBlogsRouter(PrivateGroup)
	}

	global.TB_LOG.Info("router register success")

	return Router
}
