package system

import (
	uuid "github.com/satori/go.uuid"
	"technical-blog-server/global"
)

type SysUser struct {
	global.TB_MODEL
	UUID        uuid.UUID `json:"uuid" gorm:"comment:用户UUID"`
	Username    string    `json:"username" gorm:"comment:用户登录名"`
	Password    string    `json:"password" gorm:"comment:密码"`
	NickName    string    `json:"nick_name" gorm:"default:系统用户;comment:用户昵称"`
	AuthorityId uint      `json:"authorityId" gorm:"default:888;comment:用户角色ID"`
	ActiveColor string    `json:"activeColor" gorm:"default:#262627;comment:活跃颜色"`
	Phone       string    `json:"phone" gorm:"comment:用户手机号"`
	Email       string    `json:"email" gorm:"comment:用户邮箱"`
	Enable      int       `json:"enable" gorm:"default:1;comment:用户是否被冻结 1正常 2冻结"`
	Github      string    `json:"github" gorm:"comment:github帐号"`
	Gitee       string    `json:"gitee" gorm:"comment:gitee帐号"`
	Avatar string `json:"avatar" gorm:"comment:用户头像"`
	Gender int `json:"gender" gorm:"comment:性别"`
	Age int `json:"age" gorm:"comment:年龄"`
}

func (SysUser) TableName() string {
	return "sys_user"
}
