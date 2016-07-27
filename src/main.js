import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
//import Router from 'vue-router'

Vue.use(VueResource);
//Vue.use(Router);
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

Vue.filter('concat', function(value) {
	return value.length > 40 ? value.substr(0, 37) + '...' : value;
})
//var router = new Router();
/*
router.map({
	'/about': {
		component: About
	},
	'/': {
		component: App
	}
})
*/