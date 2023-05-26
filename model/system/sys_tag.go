package system

import (
	"technical-blog-server/global"
)

type SysTag struct {
	global.TB_MODEL
	TagName string `json:"tagName" gorm:"comment:标签名字"`
	Value string `json:"value" gorm:"comment:标签value"`
	TagId string `json:"id" gorm:"comment:标签唯一标识"`
}

func (SysTag) TableName() string {
	return "sys_tag"
}
