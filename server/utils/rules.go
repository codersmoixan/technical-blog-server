package utils

var (
	LoginRule = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}}
)
