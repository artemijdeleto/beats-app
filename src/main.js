import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import style from './assets/css/style.css'
import { getCookie } from '@/cookie.js';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	data: {
		user: {
			id: 0,
			logged: false,
			token: '',
			username: '',
			nickname: '',
			avatar: ''
		},
		settings: {
			darkTheme: '',
			autoplay: false
		}
	},
	created() {
		const token = getCookie('token');
		if (token) {
			// add checking for expired token
			const payload = JSON.parse( atob( token.split('.')[1] ) );
			this.user.token = token;
			this.user.logged = true;
			this.user.id = payload.user.id;
			this.user.username = payload.user.username;
			this.user.nickname = payload.user.nickname;

			fetch(`${process.env.VUE_APP_API_ROOT}/users.get?id=${this.$root.user.id}`)
				.then(res => res.json())
				.then(res => {
					this.user.avatar = res.avatar.small;
				});
		}

		this.settings.autoplay = localStorage.getItem('autoplay');
		this.settings.darkTheme = localStorage.getItem('darkTheme') == 'true' ? true : false;

		document.title = router.currentRoute.meta.title || 'Whoops..';
		document.body.style.opacity = 1;
	},
	render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next();
});