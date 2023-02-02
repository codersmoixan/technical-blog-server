package response_param

import modelSystem "technical-blog-server/model/system"

type TagAddResponse struct {
	Label string `json:"label"`
	TagId string `json:"tagId"`
	Value string `json:"value"`
}

type TagDeleteResponse struct {
	ID string `json:"id"`
}

type TagResponse struct {
	modelSystem.SysTag
}
