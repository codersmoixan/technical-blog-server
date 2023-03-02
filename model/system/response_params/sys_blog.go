package response_param

import (
	"technical-blog-server/global"
)

type BlogResponse struct {
	global.TB_MODEL
	BlogId      string `json:"id" gorm:"comment:博客唯一标识"`
	Author      string `json:"author" gorm:"comment:作者"`
	Name        string `json:"name" gorm:"comment:文章名"`
	TagId         string `json:"tagId" gorm:"comment:标签ID"`
	Tag			string `json:"tag" gorm:"comment:标签"`
	CategoryId    string `json:"categoryId" gorm:"comment:类别ID"`
	Category    string `json:"category" gorm:"comment:类别"`
	Description string `json:"description" gorm:"comment:文章简要"`
	BlogImage   string `json:"blogImage" gorm:"comment:文章封面"`
	Favors      int    `json:"favors" gorm:"comment:文章收藏次数"`
	Views       int    `json:"views" gorm:"comment:文章阅读次数"`
	Shares      int    `json:"shares" gorm:"comment:文章分享次数"`
	Status      int    `json:"status" gorm:"comment:文章状态"` // 1 待发布 2 已发布
}

type BlogDetail struct {
	BlogResponse
	Content string `json:"content"`
}

type BlogAddResponse struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	TagId         string `json:"tagId"`
	CategoryId    string `json:"categoryId"`
	BlogImage   string `json:"blogImage"`
}

type BlogDeleteResponse struct {
	ID string `json:"id"`
}
