package system

import "technical-blog-server/global"

type SysTag struct {
	global.TB_MODEL
	Label string `json:"label" gorm:"comment:标签label"`
	TagId string `json:"tagId" gorm:"comment:标签唯一标识"`
}
