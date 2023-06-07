package article

import (
	"technical-blog-server/global"
)

type SysArticleViews struct {
	global.TB_MODEL
	ArticleId string `json:"articleId" gorm:"comment:文章ID"`
	UserId uint `json:"userId" gorm:"comment:用户ID"`
}

func (SysArticleViews) TableName() string {
	return "sys_article_views"
}
