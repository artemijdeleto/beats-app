<template>
	<div>
		<h1>
			<span class="material-icons">highlight_off</span>
			<span>Упс..</span>
		</h1>
		<h4>Кажется, такой страницы нет..</h4>
		<br>
		<router-link :to="this.$route.meta.from" class="button button--accent button--large">
			Назад
		</router-link>
	</div>
</template>