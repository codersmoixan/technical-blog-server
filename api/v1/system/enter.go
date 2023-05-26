package system

import "technical-blog-server/service"

type ApiGroup struct {
	BaseApi
	UserApi
	ArticleApi
	TagApi
	CategoryApi
	LinkApi
}

var (
	baseService     = service.GroupApp.SystemServiceGroup.BaseService
	userService     = service.GroupApp.SystemServiceGroup.UserService
	articleService     = service.GroupApp.SystemServiceGroup.ArticleService
	tagService      = service.GroupApp.SystemServiceGroup.TagService
	categoryService = service.GroupApp.SystemServiceGroup.CategoryService
	linkService     = service.GroupApp.SystemServiceGroup.LinkService
)
