<template>
	<div>
		<transition-group name="slide-fade" mode="out-in">
			<loading key="1" v-if="(loading || initialLoading)">Waiting for beats..</loading>
			<div v-if="(!loading && beats[0] != undefined)" key="2">
				<!-- <form>
					<h2>search for beats</h2>
					<button class="button secondary">open filters</button>
					<input placeholder="search by title, keyword, beatmaker" type="text">
					<button class="button primary">search</button>
				</form> -->
				
				<div>
					<h2>My beats</h2>
					<div class="audio"
						v-for="(beat, index) in beats"
						:to="'/beats/' + beat.id + '/edit'"
						:key="index">
						<div class="audio__cover">
							<img class="audio__cover__img"
								v-if="beat.cover.medium"
								:src="beat.cover.medium">
							<button @click="/*$parent.$children[10].play(beat.id)*/" class="audio__cover__controls">
								<span class="material-icons">play_arrow</span>
							</button>
						</div>
						<h3>
							<router-link class="mr-1" :to="'/beats/' + beat.id">
								<span>{{ beat.title }}</span>
							</router-link>
							<router-link class="button button--small button--accent" :to="'/beats/' + beat.id + '/edit'">
								<span class="material-icons">edit</span>
							</router-link>
						</h3>
					</div>
				</div>
			</div>
			<div key="3" v-if="nomore">
				<p>Sorry, there's no more beats..</p>
			</div>
			<div key="4" v-if="!initialLoading && pages > 1" class="pagination">
				<router-link to="/beats">1</router-link>
				<router-link v-for="page in (pages - 1)" :to="'/beats/' + (page + 1)">{{ (page + 1) }}</router-link>
			</div>
		</transition-group>
	</div>
</template>

<script>
	import loading from '@/components/Loading.vue'
	import AudioItem from '@/components/AudioCard'

	export default {
		components: {
			loading,
			AudioItem
		},
		data: () => {
			return {
				totalBeats: 0,
				initialLoading: false,
				nomore: false,
				// currentPage: 1,
				loading: false,
				pages: 1,
				beats: [
					{
						cover: {}
					}
				]
			}
		},
		watch: {
			'$route' (to, from) {
				this.getBeats({ page: to.params.page });
			}
		},
		created: function() {
			fetch(`${process.env.VUE_APP_API_ROOT}/audio.get?user_id=${this.$root.user.id}`)
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					// this.totalBeats = data.total;
					// this.pages = data.pages; // it should be calculated on client side
					this.beats = data;
				});

			/*fetch(`${process.env.VUE_APP_API_ROOT}/audio.info`)
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					this.totalBeats = data.total;
					this.pages = data.pages; // it should be calculated on client side
				});

			let page = this.$route.params.page;
			page = (page > 0) ? page : 1;
			this.getBeats({ page });
			this.loading = false;

			setTimeout(() => {
				if (this.beats[0] == undefined) this.loading = true;
			}, 500);*/
		},
		methods: {
			play: function(e) {
				const id = e.target.id;
				let player = this.$parent.$children[0];

				for (let i = player.playlist.length - 1; i >= 0; i--)
				{
					if (player.playlist[i].id == e.target.id)
					{
						player.audio.pause();
						player.currentTrack = i;
						player.audio.src = player.playlist[player.currentTrack].mp3;
						player.audio.play();

						return;
					}
				}

				fetch(`${process.env.VUE_APP_API_ROOT}/audio.get?id=${id}`)
					.then(res => res.json())
						.then(res => {
							player.playlist.push(res[0]);

							player.audio.pause();
							player.currentTrack = player.playlist.length - 1;
							player.audio.src = res[0].mp3;
							player.audio.play();
						});
			},
			getBeats: async function(options = {})
			{
				// if (options.page > 1)
				{
					if (!this.initialLoading) this.loading = true;
					this.nomore = false;
					let data = await fetch(`${process.env.VUE_APP_API_ROOT}/audio.get?page=${options.page}`);
					let temp = await data.json();
					if (temp[0] != undefined)
					{
						this.beats = temp;
					}
					else
					{
						this.beats = [];
						this.nomore = true;
					}
					this.loading = false;
					this.initialLoading = false;
				}
				// else setTimeout(() => { this.beats = this.$root.beats; }, 1000);
			}
		}
	}
</script>

<style>
	.dashboard {
		margin: 0 -10px;
	}

	.dashboard .beat {
		display: inline-block;
		position: relative;
		padding: 25px;
		text-decoration: none;
		vertical-align: top;
		text-align: center;
		margin: 10px;
	}

	.dashboard .beat .cover {
		display: block;
		margin: 0 auto 10px;
	}

	.dashboard h1 {
		margin: 0;
		font-weight: 400;
		font-size: 22px;
	}

	.dashboard .background {
		border-radius: 5px;
		filter: brightness(.5) blur(2px);
	}
</style>