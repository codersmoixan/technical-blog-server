package system

import (
	"technical-blog-server/global"
)

type SysCategory struct {
	global.TB_MODEL
	CategoryId string `json:"id" gorm:"comment:分类唯一标识"`
	CategoryName      string `json:"categoryName" gorm:"comment:分类名"`
}

func (SysCategory) TableName() string {
	return "sys_category"
}
