
# StoryNote

简易博客

后端由 Python 下的 tornado 框架支撑。

前端使用 vue 全家桶 webpack 方案。

数据库使用 SQLite，备份时可以拷了单文件就走。

**只在 Python3.5+ 环境下开发与使用过，基本能保证3.3+的正常运作**


## 版本历史

### ver 1.0.4 wip

* 新增*：游客评论

* 新增*：用户离开编辑，以及同时进行两个编辑的时候给出提示

* 新增*：新建文章为草稿

* 新增*：知乎同款复制文章版权声明

* 优化*：顶端对齐

* 优化：发布或编辑文章出现问题时，现在弹出友好的警告信息

* 修正：只能在编辑时修改引用项和状态的问题

* 破坏性改动：无


### ver 1.0.3 update 2017.09.16

* 新增：显示点击量

* 新增：给 markdown 的 \`\` 语法加上了高亮

* 新增：现在文章作者可以看到自己隐藏的主题

* 新增：编辑页面右上角增加了一个发布/编辑按钮

* 新增：文章引用功能

* 优化：评论字数上线扩充至 65536 个

* 优化：首页等位置显示文章预览内容时，不再会出现截断文本、样式喧宾夺主等情况

* 优化：文章访问安全性提升

* 优化：所有文章预览项被统一为 TopicItem 组件

* 优化：点击发布/编辑后禁用交互，等待完成

* 修正：markdown 中引用的代码被不正常转义的一种情况

* 破坏性改动：若无评论，删除 comments 表重启后端


### ver 1.0.2 update 2017.09.09

* 新增：加入通用分页器

* 优化：向新版 webpack 迁移

* 优化：编辑器按需加载，体积减小1/3

* 修正：组件重用时，实际上没有重新加载数据的严重问题

* 修正：低权限用户左侧边栏上仍有撰文和管理导航的问题

* 修正：代码引用不显示背景的问题

* 修正：评论因某些原因发送失败时不弹提示的问题

* 破坏性改动：无


### ver 1.0.1 update 2017.09.07

* 修正：构建脚本 build-pro.sh

* 修正：注册后转回首页没有加载身份信息，必须刷新

* 修正：注册登录页面的一个报错

* 修正：没有任何信息的时候，主页、文章管理和时间线仍然显示分页

* 修正：等待登陆时加载效果不明显，同时几个按钮仍然可点

* 修正：资源引用路径在当前相对路径下这一问题

* 破坏性改动：无


### ver 1.0.0 update 2017.09.06

* 初版
