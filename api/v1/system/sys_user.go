package system

import (
	"github.com/gin-gonic/gin"
	"github.com/mojocn/base64Captcha"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	modelSystem "technical-blog-server/model/system"
	requestParams "technical-blog-server/model/system/request_params"
	responseParams "technical-blog-server/model/system/response_params"
	"technical-blog-server/utils"
)

type UserApi struct{}

var store = base64Captcha.DefaultMemStore

// Register
// @description: 注册帐号
// @param: c *gin.Context
func (u *UserApi) Register(c *gin.Context) {
	var param requestParams.Register
	_ = c.ShouldBindJSON(&param)

	if err := utils.Verify(param, utils.RegisterVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	user := &modelSystem.SysUser{
		Username: param.Username,
		NickName: param.NickName,
		Password: param.Password,
		Enable:   param.Enable,
	}
	userReturn, err := userService.Register(*user)
	if err != nil {
		global.TB_LOG.Error("注册失败!", zap.Error(err))
		response.FailWithDetailed(responseParams.SysUserResponse{User: userReturn}, "注册失败!", c)
	} else {
		response.OkWithDetailed(responseParams.SysUserResponse{User: userReturn}, "注册成功!", c)
	}
}

// GetUserList
// @description: 获取用户列表
func (u *UserApi) GetUserList(c *gin.Context) {
	var pageInfo request.PageInfo
	_ = c.ShouldBindQuery(&pageInfo)

	if err := utils.Verify(pageInfo, utils.PageInfoVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if list, total, err := userService.GetUserList(pageInfo); err != nil {
		global.TB_LOG.Error("获取用户列表失败!", zap.Error(err))
		response.FailWithMessage("获取用户列表失败!", c)
	} else {
		response.OkWithDetailed(response.PageResult{
			List:     list,
			Total:    total,
			Page:     pageInfo.Page,
			PageSize: pageInfo.PageSize,
		}, "获取成功", c)
	}
}

// Login
// @description: 用户登录
// @produce: application/json
// @router: /user/login
func (u *UserApi) Login(c *gin.Context) {
	var param requestParams.Login
	_ = c.ShouldBindJSON(&param)

	if err := utils.Verify(param, utils.LoginVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if store.Verify(param.CaptchaId, param.Captcha, true) {
		mUser := &modelSystem.SysUser{
			Username: param.Username,
			Password: param.Password,
		}

		if user, err := userService.Login(mUser); err != nil {
			global.TB_LOG.Error("登录失败！用户名不存在或者密码错误！")
			response.FailWithMessage("用户名不存在或者密码错误", c)
		} else {
			if user.Enable != 1 {
				global.TB_LOG.Error("登录失败！用户被禁止登录！")
				response.FailWithMessage("用户被禁止登录", c)

				return
			}

			u.TokenNext(c, *user)
		}
	} else {
		response.FailWithMessage("验证码错误", c)
	}
}

// TokenNext
// @description: 签发token
// @param: c *gin.Context, user modelSysUser
func (u *UserApi) TokenNext(c *gin.Context, user modelSystem.SysUser) {
	j := &utils.JWT{SigningKey: []byte(global.TB_CONFIG.JWT.SigningKey)} // 唯一签名
	claims := j.CreateClaims(requestParams.BaseClaims{
		UUID:        user.UUID,
		ID:          user.ID,
		NickName:    user.NickName,
		Username:    user.Username,
		AuthorityId: user.AuthorityId,
	})
	token, err := j.CreateToken(claims)
	if err != nil {
		global.TB_LOG.Error("获取token失败!", zap.Error(err))
		response.FailWithMessage("获取token失败", c)
		return
	}

	if !global.TB_CONFIG.System.UseMultipoint {
		response.OkWithDetailed(responseParams.LoginResponse{
			User:      user,
			Token:     token,
			ExpiresAt: claims.StandardClaims.ExpiresAt * 1000,
		}, "登录成功", c)
		return
	}
}
