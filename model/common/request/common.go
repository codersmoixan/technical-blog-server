package request

type PageInfo struct {
	Page     int    `json:"page" form:"page"`
	PageSize int    `json:"pageSize" form:"pageSize"`
	KeyWord  string `json:"keyWord" form:"keyWord"`
}

// GetById Find by id structure
type GetById struct {
	ID any `json:"id" form:"id"` // 主键ID
}

func (by *GetById) String() string {
	return by.ID.(string)
}

func (by *GetById) Int() int {
	return by.ID.(int)
}

func (by *GetById) Uint() uint {
	return by.ID.(uint)
}
