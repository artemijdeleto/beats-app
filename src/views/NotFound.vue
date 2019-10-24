<template>
	<div>
		<h1>
			<span class="material-icons">highlight_off</span>
			<span>{{ $t('common.oops') }}</span>
		</h1>
		<h4>{{ $t('common.notFound') }}</h4>
		<br>
		<router-link :to="this.$route.meta.from" class="button button--accent button--large">
			{{ $t('common.goBack') }}
		</router-link>
	</div>
</template>