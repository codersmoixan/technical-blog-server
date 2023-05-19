package initialize

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "technical-blog-server/docs"
	"technical-blog-server/global"
	"technical-blog-server/middleware"
	"technical-blog-server/router"
)

// Routers
// @author: zhengji.su
// @description: 初始化总路由
func Routers() *gin.Engine {
	Router := gin.Default()
	systemRouter := router.RouterGroupApp.System

	//docs.SwaggerInfo.BasePath = "/api/v1"

	Router.Use(middleware.Cors()) // 直接放行全部跨域请求
	// Router.Use(middleware.CorsByRules()) // 按照配置的规则放行跨域请求

	// 公开的api，不需要登录也能访问
	PublicGroup := Router.Group("")
	{
		systemRouter.SetupBaseRouter(PublicGroup)
	}

	// 需要登录时才能访问的api
	PrivateGroup := Router.Group("")
	PrivateGroup.Use(middleware.JwtAuth())
	{
		systemRouter.SetupUserRouter(PrivateGroup)
		systemRouter.SetupBlogRouter(PrivateGroup)
		systemRouter.SetupTagRouter(PrivateGroup)
		systemRouter.SetupCategoryRouter(PrivateGroup)
		systemRouter.SetupLinkRouter(PrivateGroup)
	}

	Router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	global.TB_LOG.Info("router register success")

	return Router
}
