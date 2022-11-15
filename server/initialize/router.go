package initialize

import "github.com/gin-gonic/gin"

// Routers 初始化总路由
func Routers() *gin.Engine {
	router := gin.Default()

	return router
}
