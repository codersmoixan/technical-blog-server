package resource

import (
	"github.com/gin-gonic/gin"
	v1 "technical-blog-server/api/v1"
)

type FileRouter struct {}

func (f *FileRouter) SetupFileRouter(Router *gin.RouterGroup) {
	fileRouter := Router.Group("file")
	fileApi := v1.ApiGroupApp.ResourceApiGroup.FileApi
	{
		fileRouter.POST("upload", fileApi.UploadFile)
		fileRouter.POST("delete", fileApi.DeleteFile)
	}
}
