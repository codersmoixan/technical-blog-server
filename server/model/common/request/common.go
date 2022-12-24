package request

type PageInfo struct {
	Page     int    `json:"page" form:"page"`
	PageSize int    `json:"pageSize" form:"pageSize"`
	KeyWord  string `json:"keyWord" form:"keyWord"`
}

// GetById Find by id structure
type GetById struct {
	ID string `json:"id" form:"id"` // 主键ID
}
