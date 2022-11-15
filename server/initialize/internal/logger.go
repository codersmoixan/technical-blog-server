package internal

import "gorm.io/gorm/logger"

type writer struct {
	logger.Writer
}

func NewWriter(w logger.Writer) *writer {
	return &writer{
		Writer: w,
	}
}
