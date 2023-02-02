package internal

import "gorm.io/gorm/logger"

type writer struct {
	logger.Writer
}

// NewWriter
// @author: zhengji.su
// @param: w logger.Writer
// @return: *writer
func NewWriter(w logger.Writer) *writer {
	return &writer{
		Writer: w,
	}
}
