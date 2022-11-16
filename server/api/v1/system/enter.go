package system

import "technical-blog-server/service"

type ApiGroup struct {
	BaseApi
}

var (
	baseService = service.ServiceGroupApp.SystemServiceGroup.BaseService
)
