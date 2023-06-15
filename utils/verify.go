package utils

var (
	LoginVerify      = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}}
	RegisterVerify   = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}, "NickName": {NotEmpty()}}
	PageInfoVerify   = Rules{"Page": {NotEmpty()}, "PageSize": {NotEmpty()}}
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

var (
	ArticleDetailVerify = Rules{
		"ArticleName": {NotEmpty()},
		"Tags": {NotEmpty()},
		"Categories": {NotEmpty()},
		"Description": {NotEmpty()},
		"Content": {NotEmpty()},
		"ArticleImage": {NotEmpty()},
	}
	ArticleBindUserVerify = Rules{"ArticleId": {NotEmpty()}, "UserId": {NotEmpty()}}
	ArticleCommentVerify = Rules{"ArticleId": {NotEmpty()}, "UserId": {NotEmpty()}, "CommentContent": {NotEmpty()}}
	ArticleReplyVerify = Rules{
		"ArticleId": {NotEmpty()},
		"ReplyContent": {NotEmpty()},
		"ReplyCommentId": {NotEmpty()},
	}
	ArticleReplyLikedVerify = Rules{
		"ArticleId": {NotEmpty()},
		"ReplyCommentId": {NotEmpty()},
		"ReplyId": {NotEmpty()},
	}
)
