package article

import "technical-blog-server/global"

type SysArticleReplyLiked struct {
	global.TB_MODEL
	ReplyUserId string `json:"replyUserId" gorm:"comment:回复者id"`
	ArticleId string `json:"articleId" gorm:"文章id"`
	ReplyId string `json:"replyId" gorm:"被点赞的id"`
	ReplyCommentId string `json:"replyCommentId" gorm:"comment:被点赞的回复的评论id"`
	UserId string `json:"userId" gorm:"comment:点赞的用户id"`
}

func (SysArticleReplyLiked) TableName() string {
	return "sys_article_reply_liked"
}
