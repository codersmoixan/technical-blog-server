package system

import "technical-blog-server/service"

type ApiGroup struct {
	BaseApi
	UserApi
	BlogApi
}

var (
	baseService = service.GroupApp.SystemServiceGroup.BaseService
	userService = service.GroupApp.SystemServiceGroup.UserService
	blogService = service.GroupApp.SystemServiceGroup.BlogService
)
