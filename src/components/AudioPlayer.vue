<template>
	<div class="side-player">
		<div class="side-player__cover">
			<svg id="svg" width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<circle r="97" cx="100" cy="100" fill="transparent" stroke-dasharray="610" stroke-dashoffset="0"></circle>
				<circle id="bar" r="97" cx="100" cy="100" fill="transparent" stroke-dasharray="610" stroke-dashoffset="610"></circle>
			</svg>
			<img
				v-if="playlist[currentTrack].cover.large"
				:src="playlist[currentTrack].cover.large"
				class="side-player__img"
				alt=""
			>
		</div>
		<h1>
			<router-link :to="'/audio/' + playlist[currentTrack].id">
				{{ playlist[currentTrack].title }}
			</router-link>
		</h1>
		<h4 class="muted">
			<router-link :to="'/user/' + playlist[currentTrack].user.id">
				{{ playlist[currentTrack].user.nickname }}
			</router-link>
		</h4>
		<br>
		<div class="side-player__controls">
			<button @click="previous()">
				<span class="material-icons">skip_previous</span>
			</button>
			<button @click="toggle()">
				<span class="material-icons">{{ playing ? 'pause' : 'play_arrow' }}</span>
			</button>
			<button @click="next()">
				<span class="material-icons">skip_next</span>
			</button>
		</div>
	</div>
</template>
<style>
	.side-player__img {
		position: absolute;
		top: 25px;
		left: 25px;
	}

	#svg {
		z-index: 9;
	}

	#svg circle {
		/*stroke-dashoffset: 0;*/
		stroke: #ddd;
		transition: stroke-dashoffset 2s linear;
		stroke-width: 6px;
	}
	#svg #bar {
		stroke: var(--primary-color);
	}
	.side-player__cover {
		display: block;
		height: 200px;
		width: 200px;
		margin: 0 auto 1rem auto;
		/*box-shadow: 0 0 5px #0002;*/
		border-radius: 100%;
		position: relative;
	}
	.side-player__cover::after {
		position: absolute;
		height: 188px;
		width: 188px;
		left: 6px;
		top: 6px;
		/*box-shadow: inset 0 0 5px #0002;*/
		content: '';
		border-radius: 100%;
		z-index: 0;
	}
</style>
<script>
	// import style from '@/assets/css/player.css';
	import Snackbar from '@/assets/js/snackbar.js';

	export default {
		data() {
			return {
				playlist: [
					{
						user: {},
						cover: {}
					}
				],
				expanded: undefined,
				audio: {},
				currentTrack: 0,
				currentSeconds: 0,
				durationSeconds: 1,
				playing: false
			}
		},
		computed: {
			currentTime() {
				return this.convertTimeHHMMSS(this.currentSeconds);
			},
			durationTime() {
				return this.convertTimeHHMMSS(this.durationSeconds);
			},
			percentComplete() {
				return parseInt(this.currentSeconds / this.durationSeconds * 100);
			}
		},
		created: function() {
			fetch(`${process.env.VUE_APP_API_ROOT}/audio.get?sort=recent`)
				.then(res => res.json())
				.then(res => {
					if (res[0]) {
						this.playlist = res;
						this.audio.src = res[0].mp3;
					}
				});

			this.expanded = (localStorage.getItem('player.expanded') == 'true') ? true : false;
		},
		mounted: function() {
			this.audio = document.createElement('audio');

			if (this.$root.settings.autoplay == 'true') {
				this.audio.autoplay = true;
			}

			this.audio.onended = () => this.next();
			this.audio.onloadstart = e => {
				setTimeout(() => {
					if (e.target.error !== null)
					{
						// this.playlist[this.currentTrack]	// remove broken file

						if (this.playlist.length > 1) {
							if (Snackbar) {
								Snackbar('Seems like audio not available. Switching to next..');
							}

							this.next(); // what if only one track in playlist? infinite loop?
						}
						else {
							if (Snackbar) {
								Snackbar('Seems like audio not available');
							}
						}
					}
				}, 1000);
			};
			this.audio.addEventListener('timeupdate', () => {
				this.currentSeconds = parseInt(this.audio.currentTime);
				const val = parseInt(this.currentSeconds / this.durationSeconds * 100);
				const circle = document.querySelector('#bar');
				const r = circle.attributes.r.value;
				const c = Math.PI*(r*2);
				const percent = ((100-val)/100)*c;

				circle.style.strokeDashoffset = percent;
			});
			this.audio.addEventListener('loadeddata', () => {
				if (localStorage.getItem('backdrop') == 'true')
				{
					/*const src = this.playlist[this.currentTrack].cover.large ? 'url(' + this.playlist[this.currentTrack].cover.large + ')' : '';
					document.querySelector('.side-player').style.backgroundImage = src;
					document.querySelector('.side-player').style.backgroundSize = 'cover';
					document.querySelector('.side-player').style.backgroundPosition = 'center';*/
				}

				this.durationSeconds = parseInt(this.audio.duration);
			});
			this.audio.addEventListener('pause', () => {
				this.playing = false;
			});
			this.audio.addEventListener('play', () => {
				this.playing = true;
			});
		},
		methods: {
			isPlaying(id = 0) {
				return (id == 0)
					? this.playing
					: (
						this.playing
						&&
						this.playlist[this.currentTrack].id == id
					);
			},
			play(src) {
				if (isNaN( Number(src) )) { // URI passed

				} else { // id passed
					let found = false;

					if (this.playlist[this.currentTrack].id == src) {
						return this.audio.play();
					}

					this.playlist.forEach((el, i) => {
						if (this.playlist[i].id == src) {
							found = true;
							this.audio.pause();
							this.currentTrack = i;
							this.audio.src = this.playlist[this.currentTrack].mp3;
							this.audio.play();
							return;
						}
					});

					if (!found) {
						fetch(`${process.env.VUE_APP_API_ROOT}/audio.get?id=${src}`)
							.then(res => res.json())
							.then(res => {
								const idx = this.playlist.push(res) - 1;
								this.audio.pause();
								this.currentTrack = idx;
								this.audio.src = this.playlist[idx].mp3;
								this.audio.play();
							});
					}
				}
			},
			convertTimeHHMMSS: seconds => {
				const hhmmss = new Date(seconds * 1000).toISOString().substr(11, 8);
				return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
			},
			/*mute() {
				if (this.muted) {
					return this.volume = this.previousVolume;
				}

				this.previousVolume = this.volume;
				this.volume = 0;
			},*/
			seek: function(e) {
				/*if (!this.playing || e.target.tagName === 'SPAN') {
					return;
				}*/
				
				const el = e.target.getBoundingClientRect();
				const seekPos = (e.clientX - el.left) / (el.width/* - 20*/);

				this.audio.currentTime = parseInt(this.audio.duration * seekPos);
			},
			previous: function() {
				let prev = --this.currentTrack;

				if (this.playlist[prev] == undefined) prev = this.currentTrack = (this.playlist.length - 1);

				this.audio.pause();
				this.audio.src = this.playlist[prev].mp3;
				this.audio.play();
			},
			toggle: function() {
				if (this.audio.paused) this.audio.play();
				else this.audio.pause();
			},
			next: function() {
				let next = ++this.currentTrack;

				if (this.playlist[next] == undefined) next = this.currentTrack = 0;

				this.audio.pause();
				this.audio.src = this.playlist[next].mp3;
				this.audio.play();
			}
		}
	}
</script>