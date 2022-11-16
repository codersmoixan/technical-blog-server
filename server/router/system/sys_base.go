package system

import "github.com/gin-gonic/gin"

type BaseRouter struct{}

func (s *BaseRouter) SetupBaseRouter(Router *gin.RouterGroup) {
	baseRouter := Router.Group("base")
	{
		baseRouter.POST("login")
	}
}
