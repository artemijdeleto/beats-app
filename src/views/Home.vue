<template>
<div>
	<section>
		<h1>
			<span class="material-icons">new_releases</span>
			<span>{{ $t('home.recent') }}</span>
		</h1>
		
		<div v-if="audio.recent[0]" class="audio-cards">
			<audio-card

				v-for="audio in audio.recent"
				:audio="audio"
				:player="player"
			></audio-card>
		</div>
		<loading v-else>{{ $t('common.loading') }}</loading>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>{{ $t('home.bestselling') }}</span>
		</h1>
		
		<div v-if="audio.bestselling[0]" class="audio-cards">
			<audio-card
				v-for="audio in audio.bestselling"
				:audio="audio"
				:player="player"
			></audio-card>
		</div>
		<loading v-else>{{ $t('common.loading') }}</loading>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>{{ $('home.popular') }}</span>
		</h1>

		<div v-if="audio.popular[0]" class="audio-cards">
			<audio-card
				v-for="audio in audio.popular"
				:audio="audio"
				:player="player"
			></audio-card>
		</div>
		<loading v-else>{{ $t('common.loading') }}</loading>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>{{ $t('home.recommendations') }}</span>
		</h1>

		<div v-if="audio.recommended[0]" class="audio-cards">
			<audio-card
				v-for="audio in audio.recommended"
				:audio="audio"
				:player="player"
			></audio-card>
		</div>
		<loading v-else>{{ $t('common.loading') }}</loading>
	</section>

	<section>
		<h1>{{ $t('home.categories') }}</h1>
		<div v-if="audio.categories[0]" class="audio-grid">
			<section v-for="category in audio.categories" class="list-container">
				<h2>{{ category.name }}</h2>
				<audio-row
					v-for="audio in category.audio"
					:audio="audio"
					:player="player"
				></audio-row>
			</section>
		</div>
		<loading v-else>{{ $t('common.loading') }}</loading>
	</section>

	<section>
		<h1>
			<span class="material-icons">whatshot</span>
			<span>{{ $t('home.popularArtists') }}</span>
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
	import AudioCard from '@/components/AudioCard'
	import AudioRow from '@/components/AudioRow'
	import Loading from '@/components/Loading'

	export default {
		components: {
			AudioCard,
			AudioRow,
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
					recent: [],
					bestselling: [],
					popular: [],
					recommended: [],
					categories: []
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