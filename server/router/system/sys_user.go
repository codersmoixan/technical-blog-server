package system

import "github.com/gin-gonic/gin"

type UserRouter struct{}

func (s *UserRouter) SetupUserRouter(Router *gin.RouterGroup) {
	userRouter := Router.Group("user")
	{
		userRouter.POST("")
	}
}
