<template>
	<div>
		<h1>{{ $t('sign.title') }}</h1>
		<form @submit.prevent="submit()">

			<label class="form-group">
				<span>{{ $t('sign.username') }}</span>
				<input v-model="username" class="form-control">
			</label>
			<br>
			<label v-if="!login" class="form-group">
				<span>{{ $t('sign.nickname') }}</span>
				<input v-model="nickname" class="form-control">
			</label>
			<br>
			<label class="form-group">
				<span>{{ $t('sign.password') }}</span>
				<input v-model="password" class="form-control" :type="login ? 'password' : 'text'">
			</label>
			<br><br>
			<button class="button button--large button--accent mr-1">{{ login ? $t('sign.login') : $t('sign.register') }}</button>
			<button class="button" type="button" @click="login = !login">{{ login ? $t('sign.create') : $t('sign.registered') }}</button>
		</form>
	</div>
</template>

<script>
	import { setCookie } from '@/cookie.js';

	export default {
		data() {
			return {
				login: true,
				username: '',
				nickname: '',
				password: ''
			}
		},
		created() {
			if (this.$root.user.logged) {
				return this.$router.replace('/');
			}
		},
		methods: {
			submit(e) {
				fetch(`${process.env.VUE_APP_API_ROOT}/users.auth`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						body: `username=${this.username}&password=${this.password}&nickname=${this.nickname}`
					})
					.then(res => res.json())
					.then(res => {

						if (res.error) return;

						// this.$root.user.username = username;
						// this.$root.user.logged = true;
						// this.$root.user.token = res.token;
						setCookie('token', res.token, {
							expires: 2592000
						});
						// localStorage.setItem('token', res.token);

						location.href = '/';
					});
			}
		}
	}
</script>