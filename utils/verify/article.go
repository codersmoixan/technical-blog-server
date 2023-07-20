package verify

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
	ArticleCommentVerify = Rules{"ArticleId": {NotEmpty()}, "UserId": {NotEmpty()}, "Content": {NotEmpty()}}
	ArticleCommentLikedVerify = Rules{
		"ArticleId": {NotEmpty()},
		"CommentId": {NotEmpty()},
		"UserId": {NotEmpty()},
	}
	ArticleReplyVerify = Rules{
		"ArticleId": {NotEmpty()},
		"Content": {NotEmpty()},
		"ReplyCommentId": {NotEmpty()},
	}
	ArticleReplyLikedVerify = Rules{
		"ArticleId": {NotEmpty()},
		"ReplyCommentId": {NotEmpty()},
		"ReplyId": {NotEmpty()},
	}
)
