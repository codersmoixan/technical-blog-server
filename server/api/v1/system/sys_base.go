package system

import (
	"github.com/gin-gonic/gin"
	"github.com/mojocn/base64Captcha"
	"technical-blog-server/global"
	response "technical-blog-server/model/common/response"
	modelSystem "technical-blog-server/model/system"
	requestParams "technical-blog-server/model/system/request_params"
	"technical-blog-server/utils"
)

type BaseApi struct{}

var store = base64Captcha.DefaultMemStore

// Login
// @description: 用户登录
// @produce: application/json
// @router: /base/login
func (b *BaseApi) Login(c *gin.Context) {
	var param requestParams.Login
	_ = c.ShouldBindJSON(param)

	if err := utils.Verify(param, utils.LoginRule); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if store.Verify(param.CaptchaId, param.Captcha, true) {
		u := &modelSystem.SysUser{
			Username: param.Username,
			Password: param.Password,
		}

		if user, err := baseService.Login(u); err != nil {
			global.TB_LOG.Error("登录失败！用户名不存在或者密码错误！")
			response.FailWithMessage("用户名不存在或者密码错误", c)
		} else {
			if user.Enable != 1 {
				global.TB_LOG.Error("登录失败！用户被禁止登录！")
				response.FailWithMessage("用户被禁止登录", c)

				return
			}

			b.TokenNext(c, *user)
		}
	} else {
		response.FailWithMessage("验证码错误", c)
	}
}

// TokenNext
// @description: 签发token
// @param: c *gin.Context, user modelSysUser
func (b *BaseApi) TokenNext(c *gin.Context, user modelSystem.SysUser) {

}
