<template>
	<div>
		<h1>Авторизация</h1>
		<form @submit.prevent="submit()">

			<label class="form-group">
				<span>Логин</span>
				<input v-model="username" class="form-control">
			</label>
			<br>
			<label v-if="!login" class="form-group">
				<span>Псевдоним</span>
				<input v-model="nickname" class="form-control">
			</label>
			<br>
			<label class="form-group">
				<span>Пароль</span>
				<input v-model="password" class="form-control" :type="login ? 'password' : 'text'">
			</label>
			<br><br>
			<button class="button button--large button--accent mr-1">{{ login ? 'Войти' : 'Зарегистрироваться' }}</button>
			<button class="button" type="button" @click="login = !login">{{ login ? 'Создать аккаунт' : 'Я уже зарегистрирван' }}</button>
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