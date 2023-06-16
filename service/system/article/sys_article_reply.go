package article

import (
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system/article"
	requestParams "technical-blog-server/model/system/request"
	"technical-blog-server/utils"
)

type ReplyService struct {}

// AddReply
// @author: zhengji.su
// @description: 新增回复
// @param: replyParams article.SysArticleReply
// @return: error
func (service *ReplyService) AddReply(replyParams article.SysArticleReply) error {
	err := global.TB_DB.Create(&replyParams).Error

	return err
}

// GetReplyList
// @author: zhengji.su
// @description: 获取回复列表
// @param: id string, pageInfo request.PageInfo
// @return: []article.SysArticleReply, error
func (service *ReplyService) GetReplyList(ids requestParams.GetReplyListIds, pageInfo request.PageInfo) ([]article.SysArticleReply, error) {
	limit, offset, _ := utils.GetPageLimitAndOffset(pageInfo)
	db := global.TB_DB.Model(article.SysArticleReply{})

	var replyList []article.SysArticleReply
	if err := db.Where("article_id = ? AND reply_comment_id = ?", ids.ArticleId, ids.ReplyCommentId).Limit(limit).Offset(offset).Find(&replyList).Error; err != nil {
		return replyList, err
	}

	return replyList, nil
}
