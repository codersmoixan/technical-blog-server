package article

import (
	"technical-blog-server/global"
	"technical-blog-server/model/common/request"
	"technical-blog-server/model/system/article"
	"technical-blog-server/utils"
)

type CommentService struct {}
type Comment = article.SysArticleComment

// GetCommentList
// @author: zhengji.su
// @description: 获取评论列表
// @param: id string pageInfo request.PageInfo
// @return: []Comment, error
func (service *CommentService) GetCommentList(id string, pageInfo request.PageInfo) ([]Comment, int64, error) {
	limit, offset, _ := utils.GetPageLimitAndOffset(pageInfo)
	db := global.TB_DB.Model(&Comment{})

	var list []Comment
	var total int64

	if err := db.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	err := db.Where("article_id = ?", id).Limit(limit).Offset(offset).Find(&list).Error

	return list, total, err
}

// SubmitComment
// @author: zhengji.su
// @description: 提交评论
// @param: commentParam article.SysArticleComment
// @return: responseParam.ArticleCommentResponse, error
func (service *CommentService) SubmitComment(commentParams Comment) (Comment, error) {
	err := global.TB_DB.Create(&commentParams).Error

	return commentParams, err
}
