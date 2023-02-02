package system

import (
	"technical-blog-server/global"
)

type SysTag struct {
	global.TB_MODEL
	Label string `json:"label" gorm:"comment:标签label"`
	Value string `json:"value" gorm:"comment:标签value"`
	TagId string `json:"id" gorm:"comment:标签唯一标识"`
}

func (SysTag) TableName() string {
	return "sys_tag"
}
