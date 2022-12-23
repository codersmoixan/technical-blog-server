package request

type TagContent struct {
	Label string `json:"label"`
}

type UpdateTag struct {
	TagContent
	ID string `json:"id"`
}
