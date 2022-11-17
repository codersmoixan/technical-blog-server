package v1

import (
	apiSystem "technical-blog-server/api/v1/system"
)

type ApiGroup struct {
	SystemApiGroup apiSystem.ApiGroup
}

var ApiGroupApp = new(ApiGroup)
