package user

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/mojocn/base64Captcha"
	"go.uber.org/zap"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/common/response"
	modelSystem "technical-blog-server/model/system"
	requestParams "technical-blog-server/model/system/request"
	responseParams "technical-blog-server/model/system/response"
	"technical-blog-server/utils"
	"technical-blog-server/utils/verify"
)

type Api struct{}

var store = base64Captcha.DefaultMemStore

// Register
// @Tags Base
// @Summary 用户注册
// @Description 用户注册
// @Accept json
// @Produce json
// @Param data body requestParams.Register true "用户注册信息"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /base/register [post]
// @param: c *gin.Context
func (api *Api) Register(c *gin.Context) {
	var param requestParams.Register
	_ = c.ShouldBindJSON(&param)

	if err := verify.Verify(param, verify.RegisterVerify); err != nil {
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
		response.FailWithMessage(err.Error(), c)
	} else {
		response.OkWithDetailed(responseParams.SysUserResponse{User: userReturn}, "注册成功!", c)
	}
}

// GetUserList
// @Tags 用户管理
// @Summary 获取用户列表
// @Description 获取用户列表
// @Param page query int true "当前页"
// @Param pageSize query int true "每页请求数量"
// @Param keyWord query string false "搜索内容"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /user/list [get]
// @param: c *gin.Context
func (api *Api) GetUserList(c *gin.Context) {
	var pageInfo request.PageInfo
	_ = c.ShouldBindQuery(&pageInfo)

	if err := verify.Verify(pageInfo, verify.PageInfoVerify); err != nil {
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

// LoginToken
// @Tags Base
// @Summary 用户登录
// @Description 用户登录
// @Accept json
// @Produce json
// @Param data body requestParams.Login true "用户名"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /base/login/token [post]
// @param: c *gin.Context
func (api *Api) LoginToken(c *gin.Context) {
	var param requestParams.Login
	_ = c.ShouldBindJSON(&param)

	if err := verify.Verify(param, verify.LoginVerify); err != nil {
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

			api.TokenNext(c, *user)
		}
	} else {
		response.FailWithMessage("验证码错误", c)
	}
}

// TokenNext
// @description: 签发token
// @param: c *gin.Context, user modelSysUser
func (api *Api) TokenNext(c *gin.Context, user modelSystem.SysUser) {
	j := &utils.JWT{SigningKey: []byte(global.TB_CONFIG.JWT.SigningKey)} // 唯一签名
	claims := j.CreateClaims(requestParams.BaseClaims{
		UserId:        user.UserId,
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
			Token:     token,
		}, "登录成功", c)
		return
	}
}

// GetMe
// @Tags 用户管理
// @Summary 获取用户信息
// @Description 获取用户信息
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /user/me [get]
// @param: c *gin.Context
func (api *Api) GetMe(c *gin.Context) {
	// 解析token
	uuid := utils.GetUserId(c)
	fmt.Println(uuid)
}

// GetUserById
// @Tags 用户管理
// @Summary 根据id获取用户信息
// @Description 根据id获取用户信息
// @Param id query string true "用户id"
// @Success 200 {string} json "{"code": "200", "msg": "", "data": ""}"
// @Router /user [get]
// @param: c *gin.Context
func (api *Api) GetUserById(c *gin.Context) {
	var byId request.GetById
	_ = c.ShouldBindQuery(&byId)

	if err := verify.Verify(byId, verify.IdVerify); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	if user, err := userService.GetUserById(byId.ID); err != nil {
		response.FailWithMessage(err.Error(), c)
		global.TB_LOG.Error("获取用户信息失败!", zap.Error(err))
	} else {
		response.OkWithDetailed(user, "获取用户信息成功!", c)
	}
}
