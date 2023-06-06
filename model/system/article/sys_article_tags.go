package article

import "technical-blog-server/global"

type SysArticleTags struct {
	global.TB_MODEL
	ArticleId string `json:"articleId" gorm:"comment:文章ID"`
	TagId string `json:"tagId" gorm:"comment:标签ID"`
}

func (SysArticleTags) TableName() string {
	return "sys_article_tags"
}
