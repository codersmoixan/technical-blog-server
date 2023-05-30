package router

import "technical-blog-server/router/system"
import "technical-blog-server/router/resource"

type RouterGroup struct {
	System system.RouterGroup
	Resource resource.RouteGroup
}

var RouterGroupApp = new(RouterGroup)
