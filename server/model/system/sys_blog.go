package system

import "technical-blog-server/global"

type SysBlog struct {
	global.TB_MODEL
	BlogId      string `json:"id" gorm:"comment:博客唯一标识"`
	Author      string `json:"author" gorm:"comment:作者"`
	Name        string `json:"name" gorm:"comment:文章名"`
	Tag         string `json:"tag" gorm:"comment:标签"`
	Category    string `json:"category" gorm:"comment:类别"`
	Description string `json:"description" gorm:"comment:文章简要"`
	Content     string `json:"content" gorm:"comment:文章内容;type:text"`
	BlogImage   string `json:"blogImage" gorm:"comment:文章封面"`
	Favors      int    `json:"favors" gorm:"comment:文章收藏次数"`
	Views       int    `json:"views" gorm:"comment:文章阅读次数"`
	Shares      int    `json:"shares" gorm:"comment:文章分享次数"`
	Status      int    `json:"status" gorm:"comment:文章状态"` // 1 待发布 2 已发布
}

func (SysBlog) TableName() string {
	return "sys_blog"
}
