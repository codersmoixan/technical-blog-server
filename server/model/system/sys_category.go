package system

import (
	"technical-blog-server/global"
)

type SysCategory struct {
	global.TB_MODEL
	CategoryId string `json:"id" gorm:"comment:分类唯一标识"`
	Label      string `json:"label" gorm:"comment:分类名"`
}
