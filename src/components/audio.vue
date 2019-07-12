<template>
	<div class="audio">
		<div class="audio__cover">
			<img 
				v-if="beat.cover.medium"
				:src="beat.cover.medium"
				class="audio__cover__img">
			<button @click="/*$parent.$children[10].play(beat.id)*/" class="audio__cover__controls">
				<span class="material-icons">play_arrow</span>
			</button>
		</div>
		<h5>
			<router-link :to="'/beats/' + beat.id">
				{{ beat.title }}
			</router-link>
		</h5>
		<h6 class="muted">
			<router-link :to="'/user/' + beat.user.id">
				{{ beat.user.nickname }}
			</router-link>
		</h6>
	</div>
</template>

<script>
	export default {
		props: {
			beat: Object
		}
	}
</script>