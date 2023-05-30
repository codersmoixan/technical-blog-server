package resource

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/response"
	"technical-blog-server/model/resource"
	resResponse "technical-blog-server/model/resource/response"
)

type FileApi struct {}

func (f *FileApi) UploadFile(c *gin.Context) {
	var file resource.ResFile
	noSave := c.DefaultQuery("noSave", "0")
	_, header, err := c.Request.FormFile("file")
	if err != nil {
		global.TB_LOG.Error("文件接收失败！", zap.Error(err))
		response.FailWithMessage("文件接收失败！", c)
		return
	}

	file, err = fileService.UploadFile(header, noSave)
	if err != nil {
		global.TB_LOG.Error("修改数据库图片链接失败!", zap.Error(err))
		response.FailWithMessage("修改数据库图片链接失败", c)
		return
	}
	response.OkWithDetailed(resResponse.ResFileResponse{File: file}, "上传成功", c)
}

func (f *FileApi) DeleteFile(c *gin.Context) {

}
