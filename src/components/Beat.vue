<template>
	<div class="beat">
		<div class="beat__cover">
			<img class="beat__cover__img"
				v-if="beat.cover.medium"
				:id="beat.id"
				:src="beat.cover.medium">
			<button @click="this.$parent.$parent.play" class="beat__cover__button">
				<span class="material-icons">play_arrow</span>
			</button>
		</div>
		<h2>
			<router-link class="no-underline" :to="'/beats/' + beat.id">{{ beat.title }}</router-link>
		</h2>
		<!-- <h3>
			<router-link class="no-underline" :to="'/user/' + beat.artist">{{ beat.artist }}</router-link>
		</h3> -->
		<h4>Tempo: <b>{{ beat.bpm }}</b> BPM</h4>
		<h6>
			Tags:
			<template v-for="(tag, index) in beat.tags">
				<router-link :to="'/beats/' + tag">
					<b>{{ tag }}</b>
				</router-link>
				<template v-if="(index + 1) < beat.tags.length">, </template>
			</template>
		</h6>
		<br>
		<button class="button">
			<template v-if="beat.price > 0">
				<span class="material-icons">shopping_cart</span>
				<span>Purchase</span>
			</template>
			<template v-else>
				<span class="material-icons">get_app</span>
				<span>Download</span>
			</template>
		</button>

		<div class="background" :style="{ backgroundImage: ( beat.cover.medium ? 'url(' + beat.cover.medium + ')' : 'linear-gradient(to left, #302b63, #654ea3)' ) }"></div>
	</div>
</template>

<script>
	export default {
		props: {
			beat: Object
		}
	}
</script>