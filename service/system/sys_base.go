package system

import (
	"errors"
	"fmt"
	"technical-blog-server/global"
	modelSystem "technical-blog-server/model/system"
	"technical-blog-server/utils"
)

type BaseService struct{}

// Login
// @description: 用户登录
// @param: u *system.SysUser
// @return: userInter *system.SysUser, err error
func (baseService *BaseService) Login(u *modelSystem.SysUser) (userInter *modelSystem.SysUser, err error) {
	if global.TB_DB == nil {
		return nil, fmt.Errorf("db not init")
	}

	var user modelSystem.SysUser

	err = global.TB_DB.Where("username = ?", u.Username).Preload("Authorities").Preload("Authority").First(&user).Error
	if err == nil {
		if ok := utils.BcryptCheck(u.Password, user.Password); !ok {
			return nil, errors.New("密码错误")
		}
	}

	return &user, err
}
