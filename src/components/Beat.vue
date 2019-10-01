<template>
	<div class="beat">
		<div class="beat__cover">
			<img class="beat__cover__img"
				v-if="audio.cover.medium"
				:id="audio.id"
				:src="audio.cover.medium">
			<button @click="this.$parent.$parent.play" class="beat__cover__button">
				<span class="material-icons">play_arrow</span>
			</button>
		</div>
		<h2>
			<router-link class="no-underline" :to="'/beats/' + audio.id">{{ audio.title }}</router-link>
		</h2>
		<!-- <h3>
			<router-link class="no-underline" :to="'/user/' + audio.artist">{{ audio.artist }}</router-link>
		</h3> -->
		<h4>Tempo: <b>{{ audio.bpm }}</b> BPM</h4>
		<h6>
			Tags:
			<template v-for="(tag, index) in audio.tags">
				<router-link :to="'/beats/' + tag">
					<b>{{ tag }}</b>
				</router-link>
				<template v-if="(index + 1) < audio.tags.length">, </template>
			</template>
		</h6>
		<br>
		<button class="button">
			<template v-if="audio.price > 0">
				<span class="material-icons">shopping_cart</span>
				<span>Purchase</span>
			</template>
			<template v-else>
				<span class="material-icons">get_app</span>
				<span>Download</span>
			</template>
		</button>

		<div class="background" :style="{ backgroundImage: ( audio.cover.medium ? 'url(' + audio.cover.medium + ')' : 'linear-gradient(to left, #302b63, #654ea3)' ) }"></div>
	</div>
</template>

<script>
	export default {
		props: {
			audio: Object
		}
	}
</script>