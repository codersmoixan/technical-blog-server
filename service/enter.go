package service

import (
	"technical-blog-server/service/resource"
	"technical-blog-server/service/system"
)

type Group struct {
	SystemServiceGroup system.ServiceGroup
	ResourceServiceGroup resource.ServiceGroup
}

var GroupApp = new(Group)
