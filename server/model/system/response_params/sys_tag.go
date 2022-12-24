package response_param

import modelSystem "technical-blog-server/model/system"

type TagAddResponse struct {
	Label string `json:"label"`
	TagId string `json:"tagId"`
}

type TagDeleteResponse struct {
	ID string `json:"id"`
}

type TagResponse struct {
	modelSystem.SysTag
}
