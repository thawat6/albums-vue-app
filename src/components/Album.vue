<template>
	<div class="pa-3">
		<v-autocomplete
			v-model="selectAlbum"
			clearable
			:items="albums"
			item-text="title"
			item-value="id"
			label="Album Title"
			@change="selectedAlbum()"></v-autocomplete>
		<div class="pa-6">
			<Photo :items="photos" />
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Photo from './Photo';
export default {
	components: { Photo },
	data() {
		return {
			selectAlbum: '',
			albums: [],
			photos: [],
			page: 1,
			perpage: 4,
			search: '',
			albumId: null,
		};
	},
	mounted() {
		axios.get(`https://jsonplaceholder.typicode.com/albums`).then((res) => {
			this.albums = res.data;
		});
		axios.get(`https://jsonplaceholder.typicode.com/photos`).then((res) => {
			this.photos = res.data;
		});
	},
	methods: {
		selectedAlbum() {
			let albumId = ``;
			if (this.selectAlbum) {
				albumId = `?albumId=${this.selectAlbum}`;
			}
			axios.get(`https://jsonplaceholder.typicode.com/photos${albumId}`).then((res) => {
				this.photos = res.data;
			});
		},
	},
};
</script>

<style></style>
