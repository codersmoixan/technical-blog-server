package system

import (
	"errors"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"technical-blog-server/global"
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
