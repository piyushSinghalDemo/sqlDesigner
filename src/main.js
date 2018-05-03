import zepto from './../static/flowchart/js/jquery.flowchart';
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate';
import store from './store/store'
import Vuetify from 'vuetify'
import Vue2Filters from 'vue2-filters'
import VueTabs from 'vue-nav-tabs'
import underscore from 'vue-underscore';
import Toaster from 'v-toaster';
import ToggleButton from 'vue-js-toggle-button'
// import '../node_modules/vuetify/dist/vuetify.min.css';
// my-project/src/index.js
import 'babel-polyfill'
Vue.use(VeeValidate);
Vue.use(VueResource)
Vue.use(Vuetify)
Vue.use(Vue2Filters)
Vue.use(VueTabs)
Vue.use(underscore);
Vue.use(Toaster, { timeout: 2000 })
Vue.use(ToggleButton)
Vue.config.productionTip = false


Vue.prototype.host = process.env.HOST
Vue.prototype.yaml_host = process.env.YAML_HOST



// Vue.http.interceptors.push(function(request, next) {
//     $('body').addClass("loading");
//     // request.headers.set("Access-Control-Allow-Origin", "*")
//     // request.headers.set("Access-Control-Allow-Methods", "*");
//     // request.headers.set("Access-Control-Allow-Headers", "*");
//     next(function(response) {
//         $('body').removeClass("loading");
//         switch (response.status) {
//             case 404:
//                 alert('page not found');
//                 break;
//             case 200:
//                 //alert('page not found');
//                 break;
//             case 204:
//                 //alert('page not found');
//                 break;
//             default:
//                 alert('ERROR: ' + response.status)

//         }
//     });
// });

var vm = new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App }
    })
    // console.log(vm);