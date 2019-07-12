<template>
	<div>
		<transition-group name="slide-fade" mode="out-in">
			<!-- <loading v-if="beats[0] == undefined">Waiting for beats..</loading> -->
			<loading key="1" v-if="(loading || initialLoading)">Waiting for beats..</loading>
			<!-- <div v-else> -->
			<div v-if="(!loading && beats[0] != undefined)" key="2">
				<form>
					<button class="button mr-1">
						<span class="material-icons mr-1">sort</span>
						<span>Filters</span>
					</button>
					<input class="button mr-1" placeholder="Title, tags or another keywords" type="text">
					<button class="button button--accent">
						<span class="material-icons mr-1">search</span>
						<span>Search</span>
					</button>
				</form>
				<br>
				<h1>Search results</h1>
				<div class="beats">
					<Beat v-for="(beat, index) in beats" :key="index" :beat="beat"></Beat>
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
	import Beat from '@/components/Beat.vue'

	export default {
		data: () =>
		{
			return {
				totalBeats: 0,
				initialLoading: true,
				nomore: false,
				// currentPage: 1,
				loading: false,
				pages: 1,
				beats: []
			}
		},
		components: {
			loading,
			Beat
		},
		watch:
		{
			'$route' (to, from) {
				this.getBeats({ page: to.params.page });
			}
		},
		methods:
		{
			play: function(e)
			{
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

				fetch(`${process.env.VUE_APP_API_ROOT}/beats.get?id=${id}`)
					.then(res => res.json())
					.then(res => {
						player.playlist.push(res[0]);

						player.audio.pause();
						player.currentTrack = player.playlist.length - 1;
						player.audio.src = res[0].mp3;
						player.audio.play();
					});


				/*let data = await fetch(`http://api.beats.com/beats.get?id=${id}`);
				player.playlist.push(await data.json());

				player.audio.pause();
				player.currentTrack = player.playlist.length - 1;
				player.audio.src = player.playlist[player.currentTrack].mp3;
				player.audio.play();*/
			},
			getBeats: async function(options = {})
			{
				// if (options.page > 1)
				{
					if (!this.initialLoading) this.loading = true;
					this.nomore = false;
					let data = await fetch(`${process.env.VUE_APP_API_ROOT}/beats.get?page=${options.page}`);
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
		},
		created: function()
		{
			fetch('/api/beats/getData')
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					/*this.totalBeats = Number(data.beats);
					this.pages = Number(data.pages);*/
					this.totalBeats = data.beats;
					this.pages = data.pages;
				});

			let page = this.$route.params.page;
			page = (page > 0) ? page : 1;
			this.getBeats({ page });
			this.loading = false;

			setTimeout(() => {
				if (this.beats[0] == undefined) this.loading = true;
			}, 500);
		}
	}
</script>

<style>
	.no-underline {
		text-decoration: none;
	}
</style>