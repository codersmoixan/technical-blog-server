package system

import (
	"errors"
	"fmt"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	modelSystem "technical-blog-server/model/system"
	"technical-blog-server/utils"
)

type UserService struct{}

// Register
// @description: 用户注册
// @param: u modeSystem.SysUSer
// @return: userInter modelSystem.SysUser, err errors
func (userService *UserService) Register(u modelSystem.SysUser) (userInter modelSystem.SysUser, err error) {
	var user modelSystem.SysUser

	// 判断用户名是否注册
	if !errors.Is(global.TB_DB.Where("username = ?", u.Username).First(&user).Error, gorm.ErrRecordNotFound) {
		return userInter, errors.New("用户已注册")
	}

	// 如果没有注册附加uuid，密码进行hash加密，然后注册
	u.Password = utils.BcryptHash(u.Password)
	u.UUID = uuid.NewV4()
	err = global.TB_DB.Create(&u).Error

	return u, err
}

// GetUserList
// @description: 分页获取用户数据
// @param: pageInfo request.PageInfo
// @return: err error, list interface{}, total int64
func (userService *UserService) GetUserList(pageInfo request.PageInfo) (list interface{}, total int64, err error) {
	limit := pageInfo.PageSize
	offset := pageInfo.PageSize * (pageInfo.Page - 1)
	db := global.TB_DB.Model(&modelSystem.SysUser{})

	var userList []modelSystem.SysUser

	if err = db.Count(&total).Error; err != nil {
		return
	}
	err = db.Limit(limit).Offset(offset).Find(&userList).Error
	fmt.Println(userList, 2212)
	return userList, total, err
}
