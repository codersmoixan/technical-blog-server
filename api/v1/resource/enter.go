package resource

import "technical-blog-server/service"

type ApiGroup struct {
	FileApi
}

var (
	fileService = service.GroupApp.ResourceServiceGroup.FileService
)
