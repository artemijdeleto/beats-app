<template>
	<div>
		<div class="beat__cover">
			<img class="beat__cover__img" :src="audio.cover.medium">
		</div>
		<!-- <h1>Основное</h1> -->
		<h1>{{ audio.title }}</h1>
		<h4 class="muted">{{ audio.user.nickname }}</h4>
		<p>{{ $t('audio.tempo') }}: {{ audio.tempo }} BPM</p>
		<p>
			{{ $t('audio.tags') }}:
			<template v-for="(tag, index) in audio.tags">
				<router-link :to="'/explore/beats?tags=' + tag">
					<b>{{ tag }}</b>
				</router-link>
				<template v-if="(index + 1) < audio.tags.length">, </template>
			</template>
		</p>
		<hr class="muted">
		<button class="button button--red">
			<span class="material-icons mr-1">
				{{ audio.likes.user_liked ? 'favorite_outline' : 'favorite' }}
			</span>
			<!-- <span class="material-icons mr-1">favorite_outline</span> -->
			<span>{{ audio.likes.count }}</span>
		</button>
		<hr class="muted">
		<br><br>
		<h2>{{ $t('audio.licensing') }}</h2>
		<div class="grid grid-3-1">
			<div v-for="license in audio.licenses" class="license">
				<h3>{{ license.name }}</h3>
				<p class="license__description">{{ license.description }}</p>
				<button class="button button--accent">
					<span class="material-icons mr-1">shopping_cart</span>
					<span>{{ $t('buy', { price: license.price }) }}</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import loading from '@/components/Loading.vue'

	export default {
		data: () =>
		{
			return {
				audio: {
					title: '',
					cover: {},
					licenses: [],
					user: {},
					likes: {
						count: 0,
						user_liked: false
					}
				}
			}
		},
		components: {
			loading
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

				fetch(`${process.env.VUE_APP_API_ROOT}/audio.get?id=${id}`)
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
		},
		created: function() {
			fetch(`${process.env.VUE_APP_API_ROOT}/audio.get?id=${this.$route.params.id}&fields=licenses`)
				.then(res => res.json())
				.then(res => {
					this.audio = res;
				});
		}
	}
</script>