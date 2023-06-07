package article

import (
	"technical-blog-server/global"
)

type SysArticleComment struct {
	global.TB_MODEL
	ArticleId string `json:"articleId" gorm:"comment:文章ID"`
	ParentId uint `json:"parentId" gorm:"comment:父ID"`
	TargetId uint `json:"targetId" gorm:"comment:回复目标者ID"`
	UserId uint `json:"userId" gorm:"comment:用户ID"`
	Content string `json:"content" gorm:"comment:回复内容"`
}

func (SysArticleComment) TableName() string {
	return "sys_article_comment"
}
