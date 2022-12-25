package system

import "technical-blog-server/service"

type ApiGroup struct {
	BaseApi
	UserApi
	BlogApi
	TagApi
	CategoriesApi
	LinkApi
}

var (
	baseService       = service.GroupApp.SystemServiceGroup.BaseService
	userService       = service.GroupApp.SystemServiceGroup.UserService
	blogService       = service.GroupApp.SystemServiceGroup.BlogService
	tagService        = service.GroupApp.SystemServiceGroup.TagService
	categoriesService = service.GroupApp.SystemServiceGroup.CategoriesService
	linkService       = service.GroupApp.SystemServiceGroup.LinkService
)
