<template>
	<form>
		<h1>{{ $t('menu.settings') }}</h1>
		<br>
		<label class="checkbox">
			<input type="checkbox" v-model="settings.autoplay">
			<span>{{ $t('settings.autoplay') }}</span>
		</label>

		<label class="checkbox">
			<input type="checkbox" v-model="settings.darkTheme">
			<span>{{ $t('settings.darkTheme') }}</span>
		</label>

		<!-- <hr class="muted"> -->
		<button @click="save" class="button button--accent button--large mr-1">{{ $t('common.save') }}</button>
		<br><br>
		<router-link to="/account/logout" class="button">{{ $t('settings.logout') }}</router-link>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				settings: {
					autoplay: false,
					darkTheme: false
				}
			}
		},
		created() {
			this.settings.autoplay = (localStorage.getItem('autoplay') === 'true') ? true : false
			this.settings.darkTheme = (localStorage.getItem('darkTheme') === 'true') ? true : false;
		},
		methods: {
			save() {
				for (let setting in this.settings) {
					localStorage.setItem(setting, this.settings[setting]);
					this.$root.settings[setting] = this.settings[setting];
				}

				// location.reload();
			},
			reset() {
				let el = document.getElementById('player');
				el.style.left = 0;
				el.style.top = 0;
				localStorage.setItem('player.position.left', 0);
				localStorage.setItem('player.position.top', 0);
			}
		}
	}
</script>