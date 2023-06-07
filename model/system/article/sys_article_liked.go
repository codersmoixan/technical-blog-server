package article

import (
	"technical-blog-server/global"
)

type SysArticleLiked struct {
	global.TB_MODEL
	ArticleId string `json:"articleId" gorm:"comment:文章ID"`
	UserId uint `json:"userId" gorm:"comment:用户ID"`
}

func (SysArticleLiked) TableName() string {
	return "sys_article_liked"
}
