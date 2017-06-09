import Vue from 'vue'
import VueRouter from 'vue-router'

import 'lodash'
import 'purecss'
import 'animate.css'
import 'font-awesome/css/font-awesome.css'
import 'simplemde/dist/simplemde.min.css'
import './assets/css/base.css'
import tools from './tools.js'
import state from './state.js'
import api from "./netapi.js"

import App from './app.vue'
import Index from './components/index.vue'
import Timeline from './components/timeline.vue'
import TopicNew from './components/new.vue'
import TopicPage from './components/topic.vue'
import TagPage from './components/tag.vue'
import SignIn from './components/user/signin.vue'
import SignUp from './components/user/signup.vue'
import SignOut from './components/user/signout.vue'
import Loading from './components/utils/loading.vue'
import About from './components/about.vue'

import { Button, Checkbox, DatePicker, Select, Tag, Input, Form, FormItem } from 'element-ui'
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Tag)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)

Vue.component('my-title', {
    props: ['size', 'text', 'aaa'],
    render: function (createElement) {
        document.title = this.text;
    },
    mounted: function () {
    }
})

Vue.use(VueRouter)

var routes = [
    { path: '/', component: Index },
    { path: '/p/:page(\\d+)', component: Index },
    { path: '/timeline', component: Timeline },
    { path: '/timeline/:page(\\d+)', component: Timeline },
    { path: '/new', component: TopicNew},
    { path: '/t/:id(\\d+)', name: 'topic1', component: TopicPage },
    { path: '/t/:id(\\d+)/:cmtpage(\\d+)', name: 'topic', component: TopicPage },
    { path: '/tag/:name(\\S+)', name: 'tag', component: TagPage },
    { path: '/new', component: TopicNew },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '/signout', component: SignOut },
    { path: '/about', component: About },
    { path: '/loading', component: Loading },
]

var router = new VueRouter({
    routes: routes
})

router.beforeEach(async function (to, from, next)  {
    if (!state.data.misc) {
        let ret = await api.misc();
        Vue.set(state.data, 'misc', ret.data);

        ret = await api.userInfo();
        if (ret.code == 0) {
            Vue.set(state.data, 'user', ret.data);
        }
    }
    next();
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
}).$mount('#app')


// markdown 渲染和代码高亮
import marked from 'marked'
import Prism from 'prismjs'
import "prismjs/themes/prism.css"
// prism 默认包含高亮：
// ["extend", "insertBefore", "DFS", "markup", "xml", "html", "mathml", "svg", "css", "clike", "javascript", "js"]
import 'prismjs/components/prism-autohotkey.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-batch.js'
import 'prismjs/components/prism-c.js'
import 'prismjs/components/prism-clike.js'
import 'prismjs/components/prism-cpp.js'
import 'prismjs/components/prism-csharp.js'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-css-extras.js'
import 'prismjs/components/prism-git.js'
import 'prismjs/components/prism-glsl.js'
import 'prismjs/components/prism-go.js'
import 'prismjs/components/prism-ini.js'
import 'prismjs/components/prism-java.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-lua.js'
import 'prismjs/components/prism-markdown.js'
import 'prismjs/components/prism-python.js'
import 'prismjs/components/prism-sql.js'


marked.setOptions({
    renderer: new marked.Renderer(),
    sanitize: true,
    highlight: function (code, lang) {
        if (lang) {
            let stdlang = lang.toLowerCase();
            if (Prism.languages[stdlang]) {
                return Prism.highlight(code, Prism.languages[stdlang]);
            }
        }
    }
})
