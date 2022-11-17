package utils

var (
	LoginRule    = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}}
	RegisterRule = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}, "NickName": {NotEmpty()}}
)
