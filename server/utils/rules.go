package utils

var (
	LoginRule      = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}}
	RegisterRule   = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}, "NickName": {NotEmpty()}}
	PageInfoRule   = Rules{"Page": {NotEmpty()}, "PageSize": {NotEmpty()}}
	BlogDetailRule = Rules{"Name": {NotEmpty()}, "Tag": {NotEmpty()}, "Categories": {NotEmpty()}, "Description": {NotEmpty()}, "Content": {NotEmpty()}, "BlogImage": {NotEmpty()}}
	IdRule         = Rules{"ID": {NotEmpty()}}
)
