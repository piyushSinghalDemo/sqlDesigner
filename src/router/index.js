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
import demo from '@/components/jointJs/demo'
import dropConnecting from '@/components/jointJs/dropConnecting'
import redrawgraph from '@/components/redrawgraph'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/dropConnecting',
            name: 'dropConnecting',
            component: dropConnecting
        },
        {
            path: '/demo',
            name: 'demo',
            component: demo
        },
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
        {
            path: '/redrawgraph',
            name: 'redrawgraph',
            component: redrawgraph
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