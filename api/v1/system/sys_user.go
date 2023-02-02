package system

import (
	"github.com/gin-gonic/gin"
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

// Register
// @description: 注册帐号
// @param: c *gin.Context
func (u *UserApi) Register(c *gin.Context) {
	var param requestParams.Register
	_ = c.ShouldBindJSON(&param)

	if err := utils.Verify(param, utils.RegisterRule); err != nil {
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

	if err := utils.Verify(pageInfo, utils.PageInfoRule); err != nil {
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
