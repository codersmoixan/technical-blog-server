package service

import "technical-blog-server/service/system"

type Group struct {
	SystemServiceGroup system.ServiceGroup
}

var GroupApp = new(Group)
