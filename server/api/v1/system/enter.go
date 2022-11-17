package system

import "technical-blog-server/service"

type ApiGroup struct {
	BaseApi
	UserApi
}

var (
	baseService = service.GroupApp.SystemServiceGroup.BaseService
	userService = service.GroupApp.SystemServiceGroup.UserService
)
