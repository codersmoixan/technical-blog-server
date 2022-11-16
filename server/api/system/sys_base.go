package system

import (
	"github.com/gin-gonic/gin"
	"github.com/mojocn/base64Captcha"
	"technical-blog-server/model/system/request"
	"technical-blog-server/model/system/response"
	"technical-blog-server/utils"
)

type BaseApi struct{}

var store = base64Captcha.DefaultMemStore

// @description 用户登录
// @produce application/json
// @router /base/login
func (b *BaseApi) Login(c *gin.Context) {
	var param request.Login
	_ = c.ShouldBindJSON(param)

	if err := utils.Verify(param, utils.LoginRule); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if store.Verify(param.CaptchaId, param.Captcha, true) {
		//_user := &system.SysUser{
		//	Username: param.Username,
		//	Password: param.Password,
		//}

	}
}
