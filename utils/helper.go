package utils

import (
	"technical-blog-server/model/common/request"
)

func GetPageLimitAndOffset(page request.PageInfo) (limit, offset int, keyWord string) {
	offset = page.PageSize * (page.Page - 1)

	return page.PageSize, offset, page.KeyWord
}

func MergeMaps[K string, V any](maps ...map[K]V) map[K]V {
	result := make(map[K]V)
	for _, m := range maps {
		for k, v := range m {
			result[k] = v
		}
	}
	return result
}
