import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/login',
                    component: resolve => require(['../components/page/Login.vue'], resolve),
                    meta: { title: '登陆', permission: true, keepAlive: true },
                    name: 'login'
                },
                {
                    path: '/retpass',
                    component: resolve => require(['../components/page/Retpassworld.vue'], resolve),
                    meta: { title: '忘记密码', permission: true, keepAlive: true },
                    name: 'retpass',
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Uploadpage.vue'], resolve),
                    meta: { title: '上传', permission: true, keepAlive: true },
                    name: 'upload',
                },
                {
                    path: '/uploadreport',
                    component: resolve => require(['../components/page/UploadReport.vue'], resolve),
                    meta: { title: '报表', permission: true, keepAlive: true },
                    name: 'uploadreport',
                },
                {
                    path: '/personal',
                    component: resolve => require(['../components/page/PersonalCenter.vue'], resolve),
                    meta: { title: '个人中心'},
                    children: [
                        {
                            path: '/home',
                            component: resolve => require(['../components/page/HomePage.vue'], resolve),
                            meta: { title: '我的主页', permission: true, keepAlive: true },
                            name:'home'
                        },
                        {
                            path: '/dataModification',
                            component: resolve => require(['../components/page/DataModification.vue'], resolve),
                            meta: { title: '资料修改', permission: true, keepAlive: true },
                            name: 'dataModification'
                        },
                        {
                            path: '/myinformation',
                            component: resolve => require(['../components/page/MyInformation.vue'], resolve),
                            meta: { title: '我的消息', permission: true, keepAlive: true },
                            name: 'myinformation'
                        },
                        {
                            path: '/checkRecord',
                            component: resolve => require(['../components/page/CheckRecord.vue'], resolve),
                            meta: { title: '检查记录', permission: true, keepAlive: true },
                            name: 'checkRecord'
                        },
                        
                    ]
                },
                {
                    path: '/test',
                    component: resolve => require(['../components/page/test.vue'], resolve),
                    meta: { title: 'test', permission: true, keepAlive: true },
                }
            ]
        },
        // {
        //     path: '/login',
        //     component: resolve => require(['../components/page/Login.vue'], resolve)
        // },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/403'
        }
    ]
})
