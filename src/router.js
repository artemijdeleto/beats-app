import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Preview from '@/views/preview'
import NotFound from '@/views/NotFound'

import Audio from '@/views/Audio'
import AudioAdd from '@/views/AudioAdd'
import AudioEdit from '@/views/AudioEdit'

import AccountSign from '@/views/AccountSign'
import AccountDashboard from '@/views/AccountDashboard'
import AccountOrders from '@/views/AccountOrders'
import AccountMessages from '@/views/AccountMessages'
import AccountSettings from '@/views/AccountSettings'

// import Explore from '@/views/Explore'
import ExploreMusic from '@/views/ExploreMusic'
// import ExploreArtists from '@/views/ExploreArtists'

import { setCookie } from '@/cookie.js';

Vue.use(Router)

export default new Router({
	// mode: '',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
	linkExactActiveClass: '',
	routes: [
		{
			path: '/',
			component: Home,
			meta: { title: 'menu.home' }
		},
		{
			path: '/preview',
			component: Preview,
			meta: { title: 'Preview' }
		},

		{
			path: '/account/sign',
			component: AccountSign,
			meta: { title: 'Авторизация' }
		},
		{
			path: '/account/dashboard',
			component: AccountDashboard,
			meta: { title: 'menu.dashboard' }
		},
		{
			path: '/account/messages',
			component: AccountMessages,
			meta: { title: 'Мои сообщения' }
		},
		{
			path: '/account/orders',
			component: AccountOrders,
			meta: { title: 'menu.orders' }
		},
		{
			path: '/account/settings',
			component: AccountSettings,
			meta: { title: 'menu.settings' }
		},
		{
			path: '/account/logout',
			beforeEnter(to, from, next) {
				setCookie('token', '', { expires: -1 });
				location.href = '/';
			}
		},

		{
			path: '/explore/music',
			component: ExploreMusic,
			meta: { title: 'Поиск музыки' }
		},

		{
			path: '/audio/:id(\\d+)?',
			component: Audio,
			meta: { title: 'Просмотр композиции' }
		},
		{
			path: '/audio/add',
			component: AudioAdd,
			meta: { title: 'Uploading' }
		},
		{
			path: '/audio/:id(\\d+)?/edit',
			component: AudioEdit,
			meta: { title: 'Редактирование' },
			beforeEnter(to, from, next) {
				to.meta.data = from.meta.data;
				next();
			}
		},

		{
			path: '*',
			component: NotFound,
			meta: { from: undefined, title: 'common.oops' },
			beforeEnter: (to, from, next) => {
				next();
				to.meta.from = from.path;
			}
		}
	]
})
