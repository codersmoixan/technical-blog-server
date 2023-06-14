package utils

import (
	"github.com/google/uuid"
	"strconv"
)

func GenerateIntStringUUID() string {
	UUID := uuid.New()
	id, err := uuid.Parse(UUID.String())

	if err != nil {
		return UUID.String()
	}

	return strconv.FormatInt(int64(id.Time()), 10)
}

func GenerateUUID() uuid.UUID {
	UUID := uuid.New()
	id , err := uuid.Parse(UUID.String())
	if err != nil {
		return UUID
	}

	return id
}
