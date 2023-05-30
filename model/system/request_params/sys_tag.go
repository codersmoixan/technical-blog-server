package request

import "technical-blog-server/model/common/request"

type TagContent struct {
	TagName string `json:"tagName"`
}

type UpdateTag struct {
	TagContent
	request.GetById
}
