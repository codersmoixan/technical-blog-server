package request

import "strconv"

type PageInfo struct {
	Page     int    `json:"page" form:"page"`
	PageSize int    `json:"pageSize" form:"pageSize"`
	KeyWord  string `json:"keyWord" form:"keyWord"`
}

// GetById Find by id structure
type GetById struct {
	ID string `json:"id" form:"id"` // 主键ID
}

func (by *GetById) Int() int {
	if value, err := strconv.ParseInt(by.ID, 10, 64); err != nil {
		return 0
	} else {
		return int(value)
	}
}

func (by *GetById) Uint() uint {
	if value, err := strconv.ParseUint(by.ID, 10, 64); err != nil {
		return 0
	} else {
		return uint(value)
	}
}
