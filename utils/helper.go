package utils

import "technical-blog-server/model/common/request"

func GetPageLimitAndOffset(page request.PageInfo) (limit, offset int, keyWord string) {
	offset = page.PageSize * (page.Page - 1)

	return page.PageSize, offset, page.KeyWord
}
