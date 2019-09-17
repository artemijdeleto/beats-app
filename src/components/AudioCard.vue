<template>
	<div class="audio">
		<div class="audio__cover">
			<img 
				v-if="audio.cover.medium"
				:id="audio.id"
				:src="audio.cover.medium"
				class="audio__cover__img"
			>
			<button @click="play()" class="audio__cover__controls">
				<span class="material-icons">
					{{
						player.isPlaying($options.propsData.audio.id)
						? 'pause'
						: 'play_arrow'
					}}
				</span>
			</button>
		</div>
		<!-- <h5></h5> -->
		<h3>
			<router-link :to="'/audios/' + audio.id">
				{{ audio.title }}
			</router-link>
		</h3>
		<h6 class="muted">
			<router-link :to="'/user/' + audio.user.id">
				{{ audio.user.nickname }}
			</router-link>
		</h6>
	</div>
</template>

<script>
	export default {
		props: {
			audio: Object,
			player: Object
		},
		methods: {
			play() {
				const props = this.$options.propsData;
				props.player.isPlaying(props.audio.id)
					? props.player.toggle()
					: props.player.play(props.audio.id)
			}
		}
	}
</script>