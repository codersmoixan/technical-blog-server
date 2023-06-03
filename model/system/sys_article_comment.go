package system

import "technical-blog-server/global"

type SysArticleComment struct {
	global.TB_MODEL
	ArticleId string `json:"articleId" gorm:"comment: 文章ID"`
	ParentId string `json:"parentId" gorm:"comment: 父ID"`
	TargetId string `json:"targetId" gorm:"comment: 回复目标者ID"`
	Content string `json:"content" gorm:"comment: 回复内容"`
}

func (SysArticleComment) TableName() string {
	return "sys_article_comment"
}
