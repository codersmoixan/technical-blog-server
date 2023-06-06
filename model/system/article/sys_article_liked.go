package article

import (
	uuid "github.com/satori/go.uuid"
	"technical-blog-server/global"
)

type SysArticleLiked struct {
	global.TB_MODEL
	ArticleId string `json:"articleId" gorm:"comment:文章ID"`
	UserId uuid.UUID `json:"userId" gorm:"comment:用户ID"`
}

func (SysArticleLiked) TableName() string {
	return "sys_article_liked"
}
