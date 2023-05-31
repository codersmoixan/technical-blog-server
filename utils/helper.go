package utils

import "reflect"

func IsEmpty(v any) bool {
	return reflect.ValueOf(v).IsValid()
}
