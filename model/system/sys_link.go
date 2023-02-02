package system

import "technical-blog-server/global"

type SysLink struct {
	global.TB_MODEL
	LinkId     string `json:"id" gorm:"comment:链接唯一标识"`
	LinkSource string `json:"linkSource" gorm:"comment:链接"`
	LinkAvatar string `json:"linkAvatar" gorm:"comment:链接头像"`
	LinkAuthor string `json:"linkAuthor" gorm:"comment:链接所属"`
	LinkName   string `json:"linkName" gorm:"comment:链接名"`
	LinkStatus int64  `json:"linkStatus" gorm:"comment:链接状态"` // 1 待审核 2 激活 3 隐藏
}

func (SysLink) TableName() string {
	return "sys_link"
}
