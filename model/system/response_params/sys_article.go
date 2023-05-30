package response_param

import (
	"technical-blog-server/global"
)

type ArticleResponse struct {
	global.TB_MODEL
	ArticleId      string `json:"id" gorm:"comment:博客唯一标识"`
	Author      string `json:"author" gorm:"comment:作者"`
	ArticleName        string `json:"articleName" gorm:"comment:文章名"`
	TagId         string `json:"tagId" gorm:"comment:标签ID"`
	Tag			string `json:"tag" gorm:"comment:标签"`
	CategoryId    string `json:"categoryId" gorm:"comment:类别ID"`
	Category    string `json:"category" gorm:"comment:类别"`
	Description string `json:"description" gorm:"comment:文章简要"`
	ArticleCoverUrl   string `json:"articleCoverUrl" gorm:"comment:文章封面"`
	ArticleCoverKey string `json:"articleCoverKey" gorm:"comment:文章封面key"`
	Favors      int    `json:"favors" gorm:"comment:文章收藏次数"`
	Views       int    `json:"views" gorm:"comment:文章阅读次数"`
	Shares      int    `json:"shares" gorm:"comment:文章分享次数"`
	Status      int    `json:"status" gorm:"comment:文章状态"` // 1 待发布 2 已发布
}

type ArticleDetail struct {
	ArticleResponse
	Content string `json:"content"`
}

type ArticleAddResponse struct {
	ArticleName        string `json:"articleName"`
	Description string `json:"description"`
	TagId         string `json:"tagId"`
	CategoryId    string `json:"categoryId"`
	ArticleCoverUrl   string `json:"articleCoverUrl"`
	ArticleCoverKey string `json:"articleCoverKey"`
}

type ArticleDeleteResponse struct {
	ID string `json:"id"`
}
