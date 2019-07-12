<template>
	<div>
	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Самые продаваемые</span>
		</h1>
		<div v-for="beat in beats" class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img"
					v-if="beat.cover.medium"
					:id="beat.id"
					:src="beat.cover.medium"
					alt="">
				<button @click="player.play(beat.id)" class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h3>
				<router-link :to="'/beats/' + beat.id">
					{{ beat.title }}
				</router-link>
			</h3>
			<h6 class="muted">
					<router-link :to="'/user/' + beat.user.id">
					{{ beat.user.nickname }}
				</router-link>
			</h6>
		</div>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Популярное</span>
		</h1>
		<div class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img" src="assets/img/1.jpg" alt="">
				<button class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h5><a href="/">Lorde — Melodrama</a></h5>
			<h6 class="muted">Pop music</h6>
		</div>
		<div class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img" src="assets/img/2.jpg" alt="">
				<button class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h5><a href="/">High hopes</a></h5>
			<h6 class="muted">140 BPM</h6>
		</div>
		<div class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img" src="assets/img/3.jpg" alt="">
				<button class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h5><a href="/">Lorde — Melodrama</a></h5>
			<h6 class="muted">Pop music</h6>
		</div>
		<div class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img" src="assets/img/4.jpg" alt="">
				<button class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h5><a href="/">High hopes</a></h5>
			<h6 class="muted">140 BPM</h6>
		</div>
		<div class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img" src="assets/img/6.jpg" alt="">
				<button class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h5><a href="/">High hopes</a></h5>
			<h6 class="muted">140 BPM</h6>
		</div>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Рекомендации</span>
		</h1>
		<div class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img" src="assets/img/1.jpg" alt="">
				<button class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h5><a href="/">Lorde — Melodrama</a></h5>
			<h6 class="muted">Pop music</h6>
		</div>
		<div class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img" src="assets/img/2.jpg" alt="">
				<button class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h5><a href="/">High hopes</a></h5>
			<h6 class="muted">140 BPM</h6>
		</div>
		<div class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img" src="assets/img/3.jpg" alt="">
				<button class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h5><a href="/">Lorde — Melodrama</a></h5>
			<h6 class="muted">Pop music</h6>
		</div>
		<div class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img" src="assets/img/4.jpg" alt="">
				<button class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h5><a href="/">High hopes</a></h5>
			<h6 class="muted">140 BPM</h6>
		</div>
		<div class="audio">
			<div class="audio__cover">
				<img class="audio__cover__img" src="assets/img/6.jpg" alt="">
				<button class="audio__cover__controls">
					<span class="material-icons">play_arrow</span>
				</button>
			</div>
			<h5><a href="/">High hopes</a></h5>
			<h6 class="muted">140 BPM</h6>
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
	// import player from '@/components/AudioPlayer';

	export default {
		data() {
			return {
				beats: [],
				player: {}
			}
		},
		mounted() {
			this.player = this.$root.$children[0].$refs.player;
		},
		created() {
			// console.log(this.player.methods.play);
			this.getBeats();
		},
		methods: {
			getBeats(options = {}) {
				// if (!this.initialLoading) this.loading = true;
				// this.nomore = false;
				fetch(`${process.env.VUE_APP_API_ROOT}/beats.get?sort=popular`)
					.then(res => res.json())
					.then(res => {
						if (res[0] != undefined) {
							this.beats = res;
						} else {
							this.beats = [];
							// this.nomore = true;
						}
						// this.loading = false;
						// this.initialLoading = false;
					});
			}
		}
	}
</script>