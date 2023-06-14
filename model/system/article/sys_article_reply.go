package article

import "technical-blog-server/global"

type SysArticleReply struct {
	global.TB_MODEL
	ReplyId string `json:"replyId" gorm:"comment:回复id"`
	ArticleId string `json:"articleId" gorm:"comment:文章id"`
	ReplyContent string `json:"replyContent" gorm:"comment:回复内容"`
	ReplyCommentId string `json:"replyCommentId" gorm:"comment:被回复的评论的id"`
	ReplyToReplyId string `json:"replyToReplyId" gorm:"comment:被回复的回复id"`
	ReplyToUserId string `json:"replyToUserId" gorm:"comment:被回复的用户id"`
	ReplyUserId string `json:"replyUserId" gorm:"comment:回复者id"`
	ReplyLiked int `json:"replyLiked" gorm:"comment:被点赞到的数量;default:0"`
}

func (SysArticleReply) TableName() string {
	return "sys_article_reply"
}

type SysArticleReplyLiked struct {
	global.TB_MODEL
	ReplyUserId string `json:"replyUserId" gorm:"comment:回复者id"`
	ArticleId string `json:"articleId" gorm:"文章id"`
	ReplyId string `json:"replyId" gorm:"被点赞的id"`
	ReplyCommentId string `json:"replyCommentId" gorm:"comment:被点赞的回复的评论id"`
}

func (SysArticleReplyLiked) TableName() string {
	return "sys_article_reply_liked"
}
