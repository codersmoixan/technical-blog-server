package v1

import (
	resourceApi "technical-blog-server/api/v1/resource"
	systemApi "technical-blog-server/api/v1/system"
)

type ApiGroup struct {
	SystemApiGroup systemApi.ApiGroup
	ResourceApiGroup resourceApi.ApiGroup
}

var ApiGroupApp = new(ApiGroup)
