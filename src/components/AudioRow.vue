<template>
	<div class="list-item">
		<img 
			v-if="audio.cover.medium"
			:id="audio.id"
			:src="audio.cover.medium"
			class="audio__cover__img"
		>
		<div class="list-item__block">
			<h3>
				<router-link :to="'/audio/' + audio.id" class="mr-1">
					{{ audio.title }}
				</router-link>
			</h3>
			<h6>
				<router-link :to="'/user/' + audio.user.id">
					{{ audio.user.nickname }}
				</router-link>
			</h6>
		</div>
		<button @click="play()" class="awesome-button">
			<span class="material-icons">
				{{
					player.isPlaying($options.propsData.audio.id)
					? 'pause'
					: 'play_arrow'
				}}
			</span>
		</button>
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