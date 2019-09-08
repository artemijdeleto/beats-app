<template>
	<div>
		<form>
			<h1>Основное</h1>
			<label class="beat__cover upload-image">
				<!-- <label class="beat__cover__controls">
					<input @change="image" type="file">
					<span tabindex="0" type="button">+</span>
				</label> -->
				<input @change="image" id="cover" type="file">
				<img class="beat__cover__img" :src="audio.cover.medium" alt="">
			</label>
			<label class="form-group">
				<span>Название</span>
				<input v-model="audio.title" placeholder="Near the Ocean, Fly Me to the Moon" class="form-control">
			</label>
			<br>
			<label class="form-group">
				<span>Темп</span>
				<input v-model="audio.tempo" placeholder="50 – 500" class="form-control">   BPM
			</label>
			<br>
			<label class="form-group">
				<span>Теги</span>
				<input v-model="audio.tags" placeholder="fast flow, atmosphere, aggressive" class="form-control">
			</label>
			<hr class="muted">
			<br>
			<h2>Файлы</h2>
			<hr class="muted">
			<br>
			<h2>Лицензирование</h2>
			<div class="grid grid-3-1">
				<div v-for="license in audio.licenses" class="license">
					<input class="button button--accent" v-model="license.name">
					<textarea v-model="license.description" class="license__description"></textarea>
					<input class="button button--accent" v-model="license.price">
				</div>
			</div>

			<hr class="muted">
			<br>
			<h3>Дополнительно</h3>
			<p>Параметры доступа</p>
			<button @click="remove" class="button button--red">
				<span class="material-icons mr-1">delete</span>
				<span>Удалить бит</span>
			</button>
			<hr class="muted">
			<button @click="update" class="button button--large button--accent">Сохранить</button>
		</form>
	</div>
</template>

<script>
	import Snackbar from '@/assets/js/snackbar.js';

	export default {
		data: () => {
			return {
				audio: {
					id: 0,
					title: '',
					tempo: 100,
					tags: '',
					cover: {
						original: '',
						medium: ''
					},
					licenses: [],
					price: 0
				}
			}
		},
		mounted() {
			if (this.$route.meta.data) {
				this.audio = this.$route.meta.data;
				this.update();
			} else {
				fetch(`${process.env.VUE_APP_API_ROOT}/audio.get?id=${this.$route.params.id}&fields=contributors,licenses`)
					.then(data => data.json())
					.then(data => this.audio = data);
			}

			const script = document.createElement('script');
			script.src = 'assets/js/id3v2.js';
			document.body.appendChild(script);
		},
		methods: {
			image(ev) {
				this.audio.cover.original = ev.target.files[0];

				const reader = new FileReader();
				reader.onload = () => {
					this.audio.cover.medium = reader.result;
				};
				reader.readAsDataURL(ev.target.files[0]);
			},
			async update() {
				let data = new FormData();
				if (document.getElementById('cover').files[0]) {
					data.append('cover', document.getElementById('cover').files[0]);
				}

				data.append('title', this.audio.title);
				data.append('tempo', this.audio.tempo);
				data.append('tags', this.audio.tags);
				if (this.audio.cover.original) {
					data.append('cover', this.audio.cover.original);
				}
				// data.append('price', this.audio.price);
				// data.append('category', this.audio.genre);
				// data.append('mood', this.audio.mood);

				let xhr = new XMLHttpRequest();
				xhr.onreadystatechange = ev => {
					if (ev.target.readyState == 4) {
						let response = '';

						try {
							response = JSON.parse(ev.target.response);
						} catch (err) {
							Snackbar('We did something wrong. Try update your beat again or open console for details');
							console.log('Response:', ev.target.response);
							console.log(err);
							return;
						}

						if (response.error) {
							Snackbar(response.error);
						} else {
							Snackbar('Your beat was successfully updated');
						}
					}
				};
				xhr.open('post', `${process.env.VUE_APP_API_ROOT}/audio.update?id=${this.audio.id}&token=${this.$root.user.token}`);
				xhr.send(data);
			},
			remove(ev) {
				if (confirm('Are you sure?')) {
					fetch(`${process.env.VUE_APP_API_ROOT}/audio.delete?id=${this.audio.id}&token=${this.$root.user.token}`);
					Snackbar(`${this.audio.title} was successfully deleted`);
					this.$router.push('/beats/my');
				}
			}
		}
	}
</script>

<style lang="scss">
	.upload-image::before {
		content: "";
		border-radius: 5px;
		display: block;
		height: 100%;
		width: 100%;
		position: absolute;
		background: #0005;
	}

	.upload-image {
		&::before, &::after {
			opacity: 0;
			transition: opacity ease .25s;
		}
		&:hover {
			&::before, &::after {
				opacity: 1;
			}
		}
	}

	.upload-image::after {
		content: "add_a_photo";
		width: 100%;
		height: 100%;
		position: absolute;
		color: #fff;
		top: 0;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 64px;
		font-family: Material Icons;
	}

	.upload-image {
		box-shadow: 0 0 5px #000;
		float: left;
		margin-right: 25px;
		position: relative;
		border-radius: 5px;
	}

	.upload-image input {
		display: none;
	}

	.upload-image img {
		border-radius: 5px;
		display: block;
		height: 250px;
		width: 250px;
	}
</style>