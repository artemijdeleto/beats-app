<template>
	<div :class="{ 'dark': this.$root.settings.darkTheme, 'menu--opened': menu }" id="app">
		<header>
			<nav>
				<button id="menu-button" @click="menu = !menu" class="button button--large button--accent mr-1">
					<span class="material-icons">menu</span>
					<!-- <span>Меню</span> -->
				</button>
				<router-link to="/" exact>
					<span class="material-icons">home</span>
					<span>Главная</span>
				</router-link>
				<router-link to="/explore">
					<span class="material-icons">search</span>
					<span>Поиск</span>
				</router-link>
				<router-link to="/explore/beats">
					<span class="material-icons">queue_music</span>
					<span>Музыка</span>
				</router-link>
				<router-link to="/explore/artists">
					<span class="material-icons">people</span>
					<span>Артисты</span>
				</router-link>
			</nav>
		</header>

		<aside class="left">
			<router-link v-if="this.$root.user.logged" to="/upload" class="button button--accent button--large">
				<span class="material-icons mr-1">library_add</span>
				<span>Загрузить</span>
			</router-link>
			<router-link v-else to="/account/auth" class="button button--accent button--large">
				<span class="material-icons mr-1">exit_to_app</span>	   
				<span>Войти</span>
			</router-link>

			<nav v-if="this.$root.user.logged">
				<br><br><br>
				<!-- <router-link to="/account">
					<span class="material-icons">person</span>
					<span>Account</span>
				</router-link>
				<router-link to="/account/messages">
					<span class="material-icons">mail_outline</span>
					<span>Messages</span>
				</router-link> -->
				<router-link to="/beats/my">
					<span class="material-icons">queue_music</span>
					<span>Панель управления</span>
				</router-link>
				<router-link to="/account/orders">
					<span class="material-icons">shopping_cart</span>
					<span>Покупки</span>
				</router-link>
				<router-link to="/account/stats">
					<span class="material-icons">trending_up</span>
					<span>Статистика</span>
				</router-link>
				<router-link to="/account/settings">
					<span class="material-icons">settings</span>
					<span>Настройки</span>
				</router-link>
			</nav>

		</aside>

		<main>
			<transition name="slide-fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</main>

		<aside class="right">
			<div v-if="this.$root.user.logged" class="side-profile">
				<img class="side-profile__img" :src="this.$root.user.avatar" alt="">
				<!-- <br> -->
				<h2>
					<router-link :to="'/user/' + this.$root.user.id">{{ this.$root.user.nickname }}</router-link>
				</h2>
				<div class="side-profile__stats">
					<table>
						<tr>
							<td>
								<span class="material-icons mr-1">monetization_on</span>
								<span class="mr-1">Sales</span>
							</td>
							<td>
								<b>10</b>
							</td>
						</tr>
						<tr>
							<td>
								<span class="material-icons mr-1">library_music</span>
								<span class="mr-1">Beats</span>
							</td>
							<td>
								<b>26</b>
							</td>
						</tr>
						<tr>
							<td>
								<span class="material-icons mr-1">people</span>
								<span class="mr-1">Followers</span>
							</td>
							<td>
								<b>105</b>
							</td>
						</tr>
					</table>
				</div>
			</div>

			<Player ref="player"></Player>
		</aside>
	</div>
</template>

<script>
	import Player from '@/components/AudioPlayer.vue'

	export default {
		components: {
			Player
		},
		data() {
			return {
				menu: false
			}
		}
	}
</script>