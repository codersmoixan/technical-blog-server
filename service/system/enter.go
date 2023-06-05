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
	ArticleService article.Service
	ArticleLikedService article.LikedService
	ArticleFavorApi article.FavorService
	ArticleViewsApi article.ViewsService
	tag.TagService
	category.CategoryService
	link.LinkService
}
