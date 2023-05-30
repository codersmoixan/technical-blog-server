package response

import "technical-blog-server/model/resource"

type ResFileResponse struct {
	File resource.ResFile `json:"file"`
}
