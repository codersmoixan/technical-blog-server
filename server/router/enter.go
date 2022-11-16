package router

import "technical-blog-server/router/system"

type RouterGroup struct {
	System system.RouterGrout
}

var RouterGroupApp = new(RouterGroup)
