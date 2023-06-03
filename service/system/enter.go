package system

import (
	"technical-blog-server/service/system/article"
	"technical-blog-server/service/system/base"
	"technical-blog-server/service/system/category"
	"technical-blog-server/service/system/link"
	"technical-blog-server/service/system/tag"
	"technical-blog-server/service/system/user"
)

type ServiceGroup struct {
	base.BaseService
	user.UserService
	article.ArticleService
	tag.TagService
	category.CategoryService
	link.LinkService
}
