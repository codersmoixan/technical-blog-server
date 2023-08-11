package verify

var (
	LoginVerify      = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}}
	RegisterVerify   = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}, "NickName": {NotEmpty()}}
	PageInfoVerify   = Rules{"Page": {NotEmpty()}, "PageSize": {NotEmpty()}}
	IdVerify         = Rules{"ID": {NotEmpty()}}
)
