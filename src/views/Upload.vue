<template>
	<div v-if="started" class="progress">
		<div id="progress" :style="{ width: progress + '%' }"></div>
	</div>
	<div v-else>
		<h1>Загрузка аудио</h1>
		<br>
		<div :class="[ 'dragbox', drag.focused ? 'dragbox--focused' : '' ]">
			<h4>
				<template v-if="!drag.focused">
					<span class="mr-1">
						Перетащите файл сюда или
					</span>
					<label class="button button--accent input_custom-file">
						<input type="file">
						<span class="material-icons mr-1">create_new_folder</span>
						<span>Выберите из ПК</span>
					</label>
				</template>
				<template v-else>
					Отпустите прямо сюда
				</template>
			</h4>
		</div>
	</div>
</template>

<script>
	// import id3 from '@/assets/js/id3v2.js';
	import Snackbar from '@/assets/js/snackbar.js';

	export default {
		data: () => {
			return {
				drag: {
					focused: false
				},
				started: false,
				progress: 0,
				file: {
					id: 0,
					title: '',
					tempo: 100,
					cover: {},
					tags: ''
				}
			}
		},
		mounted: function() {
			const script = document.createElement('script');
			script.src = 'assets/js/id3v2.js';
			document.body.appendChild(script);

			const dragbox = document.querySelector('.dragbox');

			dragbox.ondragenter = dragbox.ondragover = e => {
				e.preventDefault();
				this.drag.focused = true;
			}

			dragbox.ondragleave = e => {
				this.drag.focused = false;
			}

			dragbox.ondrop = (e) => {
				e.preventDefault();

				const file = e.dataTransfer.files[0];

				if (!file) return;

				try {
					this.upload(file);
				} catch (err) {
					Snackbar(err.message);
				}
			}
			dragbox.onchange = (e) => {
				e.preventDefault();

				const file = e.target.files[0];

				if (!file) return;

				try {
					this.upload(file);
				} catch (err) {
					Snackbar(err.message);
				}
			}
		},
		methods: {
			upload(file) {
				this.drag.focused = false;

				if (file.type.indexOf('audio/') == -1) {
					throw new Error('We accept only audio files');
				}

				this.started = true;

				function dataURItoBlob(dataURI) {
					// convert base64 to raw binary data held in a string
					// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
					var byteString = atob(dataURI.split(',')[1]);

					// separate out the mime component
					var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

					// write the bytes of the string to an ArrayBuffer
					var ab = new ArrayBuffer(byteString.length);
					var ia = new Uint8Array(ab);
					for (var i = 0; i < byteString.length; i++) {
						ia[i] = byteString.charCodeAt(i);
					}

					return new Blob([ab], {type: mimeString});
				}

				ID3v2.parseFile(file, tags => {
					if (tags.Title) {
						this.file.title = tags.Title;
					} else {
						this.file.title = (file.name.indexOf('-') == -1) ? file.name.slice(0, -4) : file.name.slice(file.name.indexOf('-') + 2, -4);
					}

					if (tags.BPM) {
						this.file.tempo = tags.BPM;
					}

					if (tags.pictures[0]) {
						this.file.cover.original = dataURItoBlob(tags.pictures[0].dataURL);
						this.file.cover.medium = tags.pictures[0].dataURL;
					}
				});

				let data = new FormData();
				data.append('file[]', file);

				let xhr = new XMLHttpRequest();
				xhr.upload.onprogress = ev => {
					this.progress = parseInt(ev.loaded / ev.total * 100);
				};
				xhr.onreadystatechange = ev => {
					if (ev.target.readyState == 4) {
						let response = {};

						try {
							response = JSON.parse(ev.target.response);
						} catch (err) {
							Snackbar('We did something wrong. Try upload your beat again or open console for details');
							console.log('Response:', ev.target.response);
							console.log(err);
							return;
						}

						if (response.error) {
							Snackbar(response.error);
						} else if (response.id == undefined) {
							Snackbar('We did something wrong. Try upload your beat again or open console for details');
							console.log('Response:', ev.target.response);
						} else {
							Snackbar('Your beat was successfully uploaded');

							this.file.id = response.id;
							this.$route.meta.data = this.file;
							setTimeout(() => {
								this.$router.push('/beats/' + response.id + '/edit');
							}, 1000);
						}
					}
				};
				xhr.open('post', `${process.env.VUE_APP_API_ROOT}/beats.add?token=${this.$root.user.token}`);
				xhr.send(data);
			}
		}
	}
</script>

<style>
	.dragbox {
		border: 3px dashed var(--text-color);
		padding: 2rem;
	}

	.dragbox--focused {
		border: 3px dashed var(--color-accent);
		background: var(--background-first-color);
	}

	.progress {
		margin-bottom: 25px;
	}

	.input_custom-file {
		display: inline-block;
		/* font-size: inherit;
		background: #44387b;
		border-radius: 5px;
		padding: 5px 15px;
		margin: 10px; */
	}

	.input_custom-file input {
		display: none;
	}

	.progress {
		background: var(--color-accent);
		width: 100%;
	}

	.progress div {
		min-width: 1%; 
		width: 0;
		box-shadow: 0 0 15px var(--color-on-accent);
		background: var(--color-on-accent);
		transition: all 1s ease;
	}

	.progress, .progress div {
		height: 25px;
		border-radius: 5px;
	}
</style>