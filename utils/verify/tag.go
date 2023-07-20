package verify

var (
	TagContentVerify = Rules{"Label": {NotEmpty()}}
	UpdateTagVerify  = Rules{"ID": {NotEmpty()}, "Label": {NotEmpty()}}
)
