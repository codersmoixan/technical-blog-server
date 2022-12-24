package system

import (
	"technical-blog-server/global"
)

type SysCategories struct {
	global.TB_MODEL
	CategoriesId string `json:"id" gorm:"comment:分类唯一标识"`
	Label        string `json:"label" gorm:"comment:分类名"`
}
