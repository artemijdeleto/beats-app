<template>
	<div>
		<h2>Мои покупки</h2>
		<div class="order">
			<img src="assets/img/1.jpg" alt="">
			<div class="order__details">
				<h4><router-link class="message" to="/account/orders/132416">Reavan — High Hopes (acoustic instrumental)</router-link></h4>
				<h6>Лицензия: эксклюзив</h6>
				<h6>Сумма: <b>5000 руб.</b></h6>
				<hr>
				<button class="button button--accent mr-1">Оплатить</button>
				<button class="button button--red">Удалить</button>
			</div>
		</div>
		<div class="order">
			<img src="assets/img/2.jpg" alt="">
			<div class="order__details">
				<h4><router-link class="message" to="/account/orders/132416">Digital Underdog — Can You Distribute It?</router-link></h4>
				<h6>Лицензия: эксклюзив</h6>
				<h6>Сумма: <b>5000 руб.</b></h6>
				<hr>
				<div class="order__details__status order__details__status--green">
					<div class="order__details__status__icon">
						<span class="material-icons">done</span>
					</div>
					<span class="order__details__status__message">Заказ был успешно оплачен</span>
					<br><br>
					<button class="button mr-1">Подробности</button>
					<a href="" class="button">Скачать архив</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.order {
		display: block;
		text-decoration: none;
		/*width: 50%;*/
		margin-bottom: 2rem;
		box-shadow: 0 0 15px var(--shadow-color);
		border-radius: 10px;
		background: var(--background-first-color);
		padding: 1rem;
		/*position: relative;*/
	}

	.order img {
		/*margin: 0 1rem 1rem 0;*/
		/*float: left;*/
		/*max-width: 100px;*/
		/*max-height: 100%;*/
		width: 15%;
		box-shadow: 0 0 5px var(--shadow-color);
		display: inline-block;
		vertical-align: top;
		border-radius: 10px;
	}

	.order__details {
		display: inline-block;
		padding: 0 1rem 0;
		vertical-align: top;
		width: 85%;
	}

	.order__details__status {
		padding: 1rem;
		border-radius: 10px;
		box-shadow: 0 0 5px #ccc;
	}

	.order__details__status--green {
		background: #28a745;
		color: #fff;
	}

	.order__details__status__icon {
		margin-right: 1rem;
		font-size: 1.25rem;
		padding: .25rem;
		border-radius: 100%;
		border: .15rem solid #fff;
		display: inline-block;
	}

	.order__details__status__message {
		font-size: 1.2rem;
	}
</style>