package response_param

import modelSystem "technical-blog-server/model/system"

type TagAddResponse struct {
	TagName string `json:"tagName"`
	TagId string `json:"tagId"`
	Value string `json:"value"`
}

type TagDeleteResponse struct {
	ID string `json:"id"`
}

type TagResponse struct {
	modelSystem.SysTag
}
