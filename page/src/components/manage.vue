<template>
<div>
    <el-tabs class="manage-panel" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="user">
            <user-manage></user-manage>
        </el-tab-pane>
        <el-tab-pane label="文章管理" name="topic">
            <topic-manage></topic-manage>
        </el-tab-pane>
        <el-tab-pane label="评论管理" name="comment">评论管理</el-tab-pane>
        <el-tab-pane label="标签管理" name="tag">标签管理</el-tab-pane>
        <!-- <el-tab-pane label="投稿审批" name="fourth">投稿审批</el-tab-pane> -->
    </el-tabs>
</div>
</template>

<style>
</style>

<script>
import state from "../state.js"
import UserManage from "./manage/user.vue"
import TopicManage from "./manage/topic.vue"

export default {
    data () {
        return {
            activeName: 'user'
        }
    },
    components: {
        UserManage,
        TopicManage,
    },
    methods: {
        handleClick (tab, event) {
            ;
        }
    },
    beforeRouteEnter: async (to, from, next) => {
        if (state.data.user.level < 100) {
            $.message_error(`无权限`);
            return next('/');
        }
        next();
    },
}
</script>

<style scoped>
.manage-panel {
    margin-top: 12px;
}

.search-box {
    width: 50%;
}
</style>
