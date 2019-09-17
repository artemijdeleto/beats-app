<template>
	<div>
	<section>
		<h1>
			<span class="material-icons">new_releases</span>
			<span>Новые релизы</span>
		</h1>
		
		
		<div v-if="audio.new[0]" class="audio-cards">
			<audio-card
				v-for="audio in audio.new"
				:audio="audio"
				:player="player"
			></audio-card>
		</div>
		<loading v-else>Загрузка..</loading>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Самые продаваемые</span>
		</h1>
		
		<div v-if="audio.bestselling[0]" class="audio-cards">
			<audio-card
				v-for="audio in audio.bestselling"
				:audio="audio"
				:player="player"
			></audio-card>
		</div>
		<loading v-else>Загрузка..</loading>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Популярное</span>
		</h1>

		<div v-if="audio.popular[0]" class="audio-cards">
			<audio-card
				v-for="audio in audio.popular"
				:audio="audio"
				:player="player"
			></audio-card>
		</div>
		<loading v-else>Загрузка..</loading>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Рекомендации</span>
		</h1>

		<div v-if="audio.recommended[0]" class="audio-cards">
			<audio-card
				v-for="audio in audio.recommended"
				:audio="audio"
				:player="player"
			></audio-card>
		</div>
		<loading v-else>Загрузка..</loading>
	</section>

	<div class="grid grid-4-4">
		<section class="list-container">
			<h1>Атмосферные</h1>
			<loading>Загрузка..</loading>
		</section>
		<section class="list-container">
			<h1>Грайм</h1>
			<loading>Загрузка..</loading>
		</section>
		<section class="list-container">
			<h1>Легкие</h1>
			<loading>Загрузка..</loading>
		</section>
	</div>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>Популярные артисты</span>
		</h1>
		<router-link
			v-for="artist in artists"
			:to="`/artist/${artist.username}`"
			tag="div"
			class="artist"
		>
			<img :src="artist.picture" class="artist__img" alt="">
			<h6>{{ artist.nickname }}</h6>
		</router-link>
	</section>
</div>
</template>

<script>
	import Loading from '@/components/Loading'
	import AudioCard from '@/components/AudioCard'

	export default {
		components: {
			AudioCard,
			Loading
		},
		data() {
			return {
				artists: [
					{
						id: 1,
						nickname: 'Reavan',
						username: 'reavan',
						picture: 'assets/img/1.jpg'
					},
					{
						id: 2,
						nickname: 'Digital Underdog',
						username: 'digital_underdog',
						picture: 'assets/img/2.jpg'
					}
				],
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