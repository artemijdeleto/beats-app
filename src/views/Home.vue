<template>
	<div>
	<section>
		<h1>
			<span class="material-icons">new_releases</span>
			<span>Новые релизы</span>
		</h1>
		
		<div class="audio-cards">
			<audio-card v-for="audio in audio.new" :audio="audio" :player="player"></audio-card>
		</div>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Самые продаваемые</span>
		</h1>
		
		<div class="audio-cards">
			<audio-card v-for="audio in audio.bestselling" :audio="audio" :player="player"></audio-card>
		</div>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Популярное</span>
		</h1>

		<div class="audio-cards">
			<audio-card v-for="audio in audio.popular" :audio="audio" :player="player"></audio-card>
		</div>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Рекомендации</span>
		</h1>

		<div class="audio-cards">
			<audio-card v-for="audio in audio.recommended" :audio="audio" :player="player"></audio-card>
		</div>
	</section>

	<div class="grid grid-4-4">
		<section class="list-container">
			<h1>Атмосферные</h1>
			<div class="list-item">
				<img src="assets/img/1.jpg" alt="">
				<div class="list-item__block">
					<h3>Travis Scott type beat</h3>
					<h6>Chris Stapleton</h6>
				</div>
				<button class="awesome-button">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<div class="list-item">
				<img src="assets/img/1.jpg" alt="">
				<div class="list-item__block">
					<h3>Travis Scott type beat</h3>
					<h6>Chris Stapleton</h6>
				</div>
				<button class="awesome-button">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
		</section>
		<section class="list-container">
			<h1>Грайм</h1>
			<div class="list-item">
				<img src="assets/img/1.jpg" alt="">
				<div class="list-item__block">
					<h3>Travis Scott type beat</h3>
					<h6>Chris Stapleton</h6>
				</div>
				<button class="awesome-button">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
		</section>
		<section class="list-container">
			<h1>Легкие</h1>
			<div class="list-item">
				<img src="assets/img/1.jpg" alt="">
				<div class="list-item__block">
					<h3>Travis Scott type beat</h3>
					<h6>Chris Stapleton</h6>
				</div>
				<button class="awesome-button">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
		</section>
	</div>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Популярные артисты</span>
		</h1>
		<div class="artist">
			<img class="artist__img" src="assets/img/1.jpg" alt="">
			<h5><a href="/">Reavan</a></h5>
		</div>
		<div class="artist">
			<img class="artist__img" src="assets/img/2.jpg" alt="">
			<h5><a href="/">High hopes</a></h5>
			<h6 class="muted">140 BPM</h6>
		</div>
	</section>
</div>
</template>

<script>
	import AudioCard from '@/components/audio'

	export default {
		components: {
			AudioCard
		},
		data() {
			return {
				audio: {
					new: [],
					bestselling: [],
					popular: [],
					recommended: []
				},
				player: {}
			}
		},
		created() {
			this.load();
		},
		mounted() {
			console.log(this);
			this.player = this.$root.$children[0].$refs.player;
		},
		methods: {
			load(options = {}) {
				// if (!this.initialLoading) this.loading = true;
				// this.nomore = false;
				fetch(`${process.env.VUE_APP_API_ROOT}/audio.get?sort=popular`)
					.then(data => data.json())
					.then(data => {
						if (data[0] != undefined) {
							this.audio.popular = data;
						} else {
							// this.audio = [];
							// this.nomore = true;
						}
						// this.loading = false;
						// this.initialLoading = false;
					});
			}
		}
	}
</script>