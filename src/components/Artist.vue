<template>
	<div class="artist-container">
		<div class="artist-image">
		<img :src="artist.images[0].url">
		</div>
		<div class="artist-social">
			<a target="_blank" title="Search Youtube" :href="'https://www.youtube.com/results?search_query=' + artist.name"><i class="icon fa fa-youtube-square fa-2x"></i></a>
			<a target="_blank" title="Find on Wikipedia" :href="'https://en.wikipedia.org/wiki/' + artist.name"><i class="icon fa fa-wikipedia-w fa-2x"></i></a>
			<a target="_blank" title="View their subreddit" :href="'https://www.reddit.com/r/' + artist.name.split(' ').join('')"><i class="icon fa fa-reddit fa-2x"></i></a>
			<a target="_blank" title="Find on Spotify" :href="'https://open.spotify.com/artist/' + artist.id"><i class="icon fa fa-spotify fa-2x"></i></a>
		</div>
		<div class="artist-info">
			<p class="artist-name"> {{ artist.name }}
			<br><span class="artist-genre">{{ artist.genres[0] }}</span></p>
			<p class="artist-desc"> {{ wikiIntro }}</p>
		</div>
		<div class="artist-player">
			<div class="now-playing" v-if="tracksReady">
				<p>{{ tracks[currentTrack].name }} - {{ tracks[currentTrack].album.name }}</p>
			</div>
			<div class="now-playing" v-if="!tracksReady">
				<p>Loading...</p>
			</div>
			<audio v-if="tracksReady" controls :src="tracks[currentTrack].preview_url"></audio>
			<div class="track-images">
				<img v-for="track in tracks" :src="track.album.images[1].url" v-on:click="setCurrentTrack($index)">
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'artist',

		props: {
		artist: Object
		},

		data() {
			return {
				wikiIntro: '',
				tracks: [],
				currentTrack: 0,
				tracksReady: false
			}
		},

		computed: {
			artistImage: function() {
				return this.artist.images[0];
			}
		},

		ready: function() {
			this.getWikiIntro(this.artist.name);
			this.getTopTracks(this.artist.id);
		},

		watch: {
			tracksReady: 'masonry'
		},

		methods: {
			getWikiIntro: function(artistName) {
				this.$http.jsonp('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=' + this.artist.name).then((response) => {
					//console.log(response);
					var pageID = Object.keys(response.data.query.pages);
					var untrimmedString = response.data.query.pages[pageID].extract;
					var trimmedString = untrimmedString.length > 100 ? untrimmedString.substr(0, 100) + "..." : untrimmedString;
					this.wikiIntro = trimmedString;
				})
			},
			
			getTopTracks(id) {
				this.$http.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US').then((response) => {
					//console.log(this.artist.name);
					//console.log(response);
					this.tracks = response.data.tracks.slice(0, 3);
					this.tracksReady = true;
				}, (response) => {
					console.log("Unable to get top tracks for artist: " + artist.name);
				})
			},

			masonry: function() {
				var imgLoad = imagesLoaded( document.querySelector('.container') );
				imgLoad.on('done', function() {
  					console.log('all images loaded');
  					new Masonry('.grid', {
        				itemSelector: '.artist-container'
      				})
				})
    		},

    		setCurrentTrack(index) {
    			this.currentTrack = index;
    		}
		}
	}
</script>

<style>

.artist-container {
	text-align: center;
	display: inline-block;
	width: 30%;
	height: auto;
	margin: 1.6%;
	margin-top: 10px;
	background-color: #383838;
	color: #dedede;
	vertical-align: top;
	position: relative;
	font-size: 1.2em;
}

@media only screen and (max-width: 992px) {
	.artist-container {
		width: 47.5%;
		margin-left: 1.25%;
		margin-right: 1.25%;
		font-size: 1.2em;
	}
}

@media only screen and (max-width: 768px) {
	.artist-container {
		width: 75%;
		margin: 5% 12.5%;
		font-size: 1.4em;
	}
}

.artist-image {
	width: 100%;
	overflow: hidden;
	position: relative;
}
.artist-image img {
	width: 100%;
	height: auto;
}

.artist-social {
	margin: 0 auto;
	margin-top: 10px;
	width: 60%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.artist-social a {
	color: #dedede;
}

.artist-name {
	font-size: 1.8em;
	line-height: 1;
}

.artist-genre {
	font-size: .8em;
	font-weight: 300;
	font-style: italic;
}

.artist-info {
	width: 100%;
	padding: 15px;
}

.artist-player {
	width: 100%;
	background-color: #2b2b2b;
	position: relative;
}

.artist-player audio {
	color: red;
	width: 100%;
	position: relative;
	bottom: -6px;
}

.artist-player .now-playing p {
	padding: 10px 15px;
}

.track-images {
	width: 100%;
}
.track-images img {
	float: left;
	width: 33.3%;
	display: inline-block;
	opacity: 0.7;
}
.track-images img:hover {
	opacity: 1;
	cursor: pointer;
}

.icon:hover {
	color: #e81c4f;
}

</style>

