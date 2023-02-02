package request

import "technical-blog-server/model/common/request"

type TagContent struct {
	Label string `json:"label"`
}

type UpdateTag struct {
	TagContent
	request.GetById
}
