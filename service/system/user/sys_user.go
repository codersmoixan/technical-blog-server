package user

import (
	"errors"
	"fmt"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	modelSystem "technical-blog-server/model/system"
	"technical-blog-server/utils"
)

type Service struct{}

// Register
// @author: zhengji.su
// @description: 用户注册
// @param: u modeSystem.SysUSer
// @return: userInter modelSystem.SysUser, err errors
func (service *Service) Register(u modelSystem.SysUser) (userInter modelSystem.SysUser, err error) {
	var user modelSystem.SysUser

	// todo 判断用户名是否注册
	if !errors.Is(global.TB_DB.Where("username = ?", u.Username).First(&user).Error, gorm.ErrRecordNotFound) {
		return userInter, errors.New("用户已注册")
	}

	// todo 如果没有注册附加uuid，密码进行hash加密，然后注册
	u.Password = utils.BcryptHash(u.Password)
	u.UserId = utils.GenerateIntStringUUID()
	err = global.TB_DB.Create(&u).Error

	return u, err
}

// GetUserList
// @author: zhengji.su
// @description: 分页获取用户数据
// @param: pageInfo request.PageInfo
// @return: err error, list interface{}, total int64
func (service *Service) GetUserList(pageInfo request.PageInfo) (list interface{}, total int64, err error) {
	limit := pageInfo.PageSize
	offset := pageInfo.PageSize * (pageInfo.Page - 1)
	db := global.TB_DB.Model(&modelSystem.SysUser{})

	var userList []modelSystem.SysUser

	if err = db.Count(&total).Error; err != nil {
		return
	}
	err = db.Limit(limit).Offset(offset).Find(&userList).Error
	return userList, total, err
}

// GetUserById
// @author: zhengji.su
// @description: 根据id获取用户数据
// @param: id string
// @return: modelSystem.SysUser, error
func (service *Service) GetUserById(id uint) (modelSystem.SysUser, error) {
	db := global.TB_DB.Model(&modelSystem.SysUser{})
	var user modelSystem.SysUser

	err := db.Where("id = ?", id).First(&user).Error
	return user, err
}

// GetUserByIds
// @author: zhengji.su
// @description: 根据id组获取用户组
// @param: ids []string
// @return: []modelSystem.SysUser, error
func (service *Service) GetUserByIds(ids []string) ([]modelSystem.SysUser, error) {
	db := global.TB_DB.Model(&modelSystem.SysUser{})
	var userList []modelSystem.SysUser

	err := db.Where("uuid IN (?)", ids).Omit("password").Find(&userList).Error
	return userList, err
}

// Login
// @description: 用户登录
// @param: u *system.SysUser
// @return: userInter *system.SysUser, err error
func (service *Service) Login(u *modelSystem.SysUser) (userInter *modelSystem.SysUser, err error) {
	if global.TB_DB == nil {
		return nil, fmt.Errorf("db not init")
	}

	var user modelSystem.SysUser

	err = global.TB_DB.Where("username = ?", u.Username).First(&user).Error
	if err != nil {
		global.TB_LOG.Error("查询失败!", zap.Error(err))
	} else {
		if ok := utils.BcryptCheck(u.Password, user.Password); !ok {
			return nil, errors.New("密码错误")
		}
	}

	return &user, err
}
