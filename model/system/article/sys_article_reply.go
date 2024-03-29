package article

import "technical-blog-server/global"

type SysArticleReply struct {
	global.TB_MODEL
	ReplyId string `json:"replyId" gorm:"comment:回复id"`
	ArticleId string `json:"articleId" gorm:"comment:文章id"`
	Content string `json:"content" gorm:"comment:回复内容"`
	ReplyCommentId string `json:"replyCommentId" gorm:"comment:被回复的评论的id"`
	ReplyToReplyId string `json:"replyToReplyId" gorm:"comment:被回复的回复id"`
	ReplyToUserId string `json:"replyToUserId" gorm:"comment:被回复的用户id"`
	ReplyUserId string `json:"replyUserId" gorm:"comment:回复者id"`
	ReplyLiked int `json:"liked" gorm:"comment:被点赞到的数量;default:0"`
	ReplyCount int `json:"replyCount" gorm:"comment:被回复的数量;default:0"`
}

func (SysArticleReply) TableName() string {
	return "sys_article_reply"
}
