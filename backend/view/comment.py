# coding:utf-8

import config
from model.topic import Topic
from view import route, url_for, View, AjaxView, AjaxLoginView
from model.comment import Comment


@route('/api/comment/del/(\d+)')
class CommentDeleteView(AjaxLoginView):
    def post(self, comment_id):
        comment = Comment.get_by_pk(comment_id)
        if not comment:
            self.finish({'code': -1})
        else:
            if comment.can_edit(self.current_user()):
                comment.delete()
                self.finish({'code': 0})
            else:
                self.finish({'code': -2})


@route('/api/comment/(\d+)', name="comment")
class CommentView(AjaxView):
    def get(self, relate_id):
        # TODO: page 为 0 时取最后一页
        page = self.get_argument('page', '1')
        if not page.isdigit():
            return self.finish({'code': -1})

        offset = (int(page)-1) * config.COMMENT_PAGE_SIZE
        comment_count, comments = Comment.get_list(relate_id, offset=offset)
        
        self.finish({'code': 0, 'data': {
            'page_size': config.COMMENT_PAGE_SIZE,
            'items': list(map(Comment.to_dict, comments)),
            'count': comment_count,
        }})

    def post(self, relate_id):
        code, msg = self.comment(relate_id)
        if code == 0:
            self.finish({'code': code, 'msg': msg, 'data': {'id': self._r.id}})
        else:
            self.finish({'code': code, 'msg': msg})

    def comment(self, relate_id):
        # 1. 发送评论必须登录
        if not self.current_user():
            return -255, '请先登录后再做此操作'

        content = self.get_argument('content', '').strip()

        # 3. 正文必须存在
        if not content:
            return -3, '请输入内容'

        # 4. 正文不能超过 65535 字
        if len(content) > config.COMMENT_MAX_LENGTH:
            return -4, '评论不能超过65535字'

        # TODO: 未来允许评论评论（楼中楼）
        # 6. relate_id 存在检查
        t = Topic.get_by_pk(relate_id)
        if not t:
            return -6, '你试图评论一个不存在的主题'

        # 7. 存入数据库
        r = Comment.new(relate_id, self.current_user(), content)
        self._r = r
        return 0, '评论发送成功'
