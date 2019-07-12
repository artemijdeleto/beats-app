<template>
	<div>
		<h2>Messages</h2>
		<router-link class="message" to="/account/messages/reavan">
			<img src="assets/img/1.jpg" alt="">
			<h4>Reavan</h4>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut officia voluptatem error omnis aliquid similique, tempora deserunt minus reiciendis a corrupti fugit accusantium, voluptatibus, quia quidem fugiat enim totam dolor.</p>
		</router-link>
	</div>
</template>

<style>
	.message {
		display: block;
		text-decoration: none;
		/*width: 50%;*/
	}

	.message img {
		margin: 0 1rem 1rem 0;
		float: left;
		max-width: 100px;
		border-radius: 10px;
	}
</style>