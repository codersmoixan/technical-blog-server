package system

import "technical-blog-server/service"

type ApiGroup struct {
	BaseApi
	UserApi
	BlogApi
	TagApi
}

var (
	baseService = service.GroupApp.SystemServiceGroup.BaseService
	userService = service.GroupApp.SystemServiceGroup.UserService
	blogService = service.GroupApp.SystemServiceGroup.BlogService
	tagService  = service.GroupApp.SystemServiceGroup.TagService
)
