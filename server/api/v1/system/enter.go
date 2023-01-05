package system

import "technical-blog-server/service"

type ApiGroup struct {
	BaseApi
	UserApi
	BlogApi
	TagApi
	CategoryApi
	LinkApi
}

var (
	baseService     = service.GroupApp.SystemServiceGroup.BaseService
	userService     = service.GroupApp.SystemServiceGroup.UserService
	blogService     = service.GroupApp.SystemServiceGroup.BlogService
	tagService      = service.GroupApp.SystemServiceGroup.TagService
	categoryService = service.GroupApp.SystemServiceGroup.CategoryService
	linkService     = service.GroupApp.SystemServiceGroup.LinkService
)
