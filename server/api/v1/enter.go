package v1

import (
	system2 "technical-blog-server/api/v1/system"
)

type ApiGroup struct {
	SystemApiGroup system2.ApiGroup
}

var ApiGroupApp = new(ApiGroup)
