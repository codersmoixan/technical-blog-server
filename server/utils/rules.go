package utils

var (
	LoginRule      = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}}
	RegisterRule   = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}, "NickName": {NotEmpty()}}
	PageInfoRule   = Rules{"Page": {NotEmpty()}, "PageSize": {NotEmpty()}}
	BlogDetailRule = Rules{"Name": {NotEmpty()}, "Tag": {NotEmpty()}, "Categories": {NotEmpty()}, "Description": {NotEmpty()}, "Content": {NotEmpty()}, "BlogImage": {NotEmpty()}}
	IdRule         = Rules{"ID": {NotEmpty()}}
)

var (
	TagContentRule = Rules{"Label": {NotEmpty()}}
	UpdateTagRule  = Rules{"ID": {NotEmpty()}, "Label": {NotEmpty()}}
)

var (
	CategoriesRule       = Rules{"Label": {NotEmpty()}}
	UpdateCategoriesRule = Rules{"ID": {NotEmpty()}, "Label": {NotEmpty()}}
)
