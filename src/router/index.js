import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
// import sqldata from '@/components/sqldesignerList'
// import SqlDesigner from '@/components/SqlDesigner'
// import GoJsSqlDesigner from '@/components/GoJsSqlDesigner'
// import JsPlumbSqlDesigner from '@/components/JsPlumbSqlDesigner'
import FlowchartSqlDesigner from '@/components/flowchartSqlDesigner'
import JointDemo from '@/components/jointdemo'
import Jointjsdragdrop from '@/components/jointjsdragdrop'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: 'Hello',
        //     component: sqldata
        // },
        // {
        //     path: '/sqldata',
        //     name: 'sqldata',
        //     component: sqldata
        // },
        //
        // {
        //   path: '/collection/:collectionId/edit',
        //   name: 'edit-collection',
        //   component: ManageCollection
        // },
        // {
        //     path: '/sqldesigner',
        //     name: 'sqldesigner',
        //     component: SqlDesigner
        // },
        // {
        //   path: '/gojsdesigner',
        //   name: 'gojsdesigner',
        //   component: GoJsSqlDesigner
        // },
        // {
        //   path: '/jsplubmdesigner',
        //   name: 'jsplubmdesigner',
        //   component: JsPlumbSqlDesigner
        // },
        {
            path: '/flowchartdesigner',
            name: 'flowchartdesigner',
            component: FlowchartSqlDesigner
        },
        {
            path: '/jointdemo',
            name: 'jointdemo',
            component: JointDemo
        },
        {
            path: '/jointjsdragdrop',
            name: 'jointjsdragdrop',
            component: Jointjsdragdrop
        },
        // {
        //   path: '/streamer/index',
        //   name: 'streamer.index',
        //   component: Streamer,
        //   children: [
        //   ]
        // }
    ]
})