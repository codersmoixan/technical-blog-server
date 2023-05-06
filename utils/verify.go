package utils

var (
	LoginVerify      = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}}
	RegisterVerify   = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}, "NickName": {NotEmpty()}}
	PageInfoVerify   = Rules{"Page": {NotEmpty()}, "PageSize": {NotEmpty()}}
	BlogDetailVerify = Rules{"Name": {NotEmpty()}, "Tag": {NotEmpty()}, "Categories": {NotEmpty()}, "Description": {NotEmpty()}, "Content": {NotEmpty()}, "BlogImage": {NotEmpty()}}
	IdVerify         = Rules{"ID": {NotEmpty()}}
)

var (
	TagContentVerify = Rules{"Label": {NotEmpty()}}
	UpdateTagVerify  = Rules{"ID": {NotEmpty()}, "Label": {NotEmpty()}}
)

var (
	CategoriesVerify       = Rules{"Label": {NotEmpty()}}
	UpdateCategoriesVerify = Rules{"ID": {NotEmpty()}, "Label": {NotEmpty()}}
)
