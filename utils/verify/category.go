package verify

var (
	CategoryVerify       = Rules{"Label": {NotEmpty()}}
	UpdateCategoryVerify = Rules{"ID": {NotEmpty()}, "Label": {NotEmpty()}}
)
