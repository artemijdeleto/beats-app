import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/views/Auth.vue'
import Home from './views/Home.vue'
import Beats from './views/Beats.vue'
import Beat from './views/Beat'
import Edit from './views/Edit.vue'
import AccountBeats from '@/views/account/beats'
import AccountOrders from '@/views/account/orders'
import AccountMessages from './views/account/messages.vue'
import AccountSettings from './views/account/settings.vue'
// import Dashboard from './views/Dashboard.vue'
import Upload from './views/Upload.vue'
import Preview from './views/preview.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

import { setCookie } from '@/cookie.js';

export default new Router({
	// mode: '',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
	linkExactActiveClass: '',
	routes: [
		{
			path: '/',
			component: Home,
			meta: { title: 'Home' }
		},
		{
			path: '/preview',
			component: Preview,
			meta: { title: 'Preview' }
		},
		{
			path: '/account/auth',
			component: Auth,
			meta: { title: 'Authorization' }
		},
		{
			path: '/account/messages',
			component: AccountMessages,
			meta: { title: 'Мои сообщения' }
		},
		{
			path: '/account/orders',
			component: AccountOrders,
			meta: { title: 'Мои покупки' }
		},
		{
			path: '/beats/my',
			component: AccountBeats,
			meta: { title: 'My beats' }
		},
		{
			path: '/account/settings',
			component: AccountSettings,
			meta: { title: 'Settings' }
		},
		{
			path: '/account/logout',
			beforeEnter(to, from, next) {
				setCookie('token', '', { expires: -1 });
				location.href = '/';
			}
		},
		/*{
			path: '/beats/:page(\\d+)?',
			component: Beats,
			meta: { title: 'beats' }
		},*/
		{
			path: '/explore/beats',
			component: Beats,
			meta: { title: 'Explore beats' }
		},
		{
			path: '/beats/:id(\\d+)?',
			component: Beat,
			meta: { title: 'Beat' }
		},
		{
			path: '/beats/:id(\\d+)?/edit',
			component: Edit,
			meta: { title: 'Edit' },
			beforeEnter(to, from, next) {
				to.meta.data = from.meta.data;
				next();
			}
		},
		{
			path: '/upload',
			component: Upload,
			meta: { title: 'Uploading' }
		},
		{
			path: '*',
			component: NotFound,
			beforeEnter: (to, from, next) => {
				next();
				to.meta.from = from.path;
			},
			meta: { from: undefined, title: 'Whoops..' }
		}/*,
		{
			path: '/about',
			name: 'about',
			component: () => import(/* webpackChunkName: "about" */ /*'./views/About.vue')
		}*/
	]
})
