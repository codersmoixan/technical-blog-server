package article

import "technical-blog-server/service/system/user"

var articleService = new(Service)
var userService = new(user.Service)
var articleReplyService = new(ReplyService)
var articleCommentService = new(CommentService)
var articleFavorService = new(FavorService)
var articleViewsService = new(ViewsService)
