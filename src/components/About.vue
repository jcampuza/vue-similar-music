<template>
	<div>
		<p class="about-header">Hi, I'm Joseph Campuzano!</p>
		<p class="about-text">I built this site webapp in order to learn Vue.JS. It utilizes both the Spotify Web API as well as the Wikipedia Web API. It uses <a href="http://getbootstrap.com/">Bootstrap</a> (mostly for prototyping, its useful default styles, and containers) as well as font-awesome for its awesome icons. It also uses the <a href="http://masonry.desandro.com/">Masonry library</a> and the <a href="http://imagesloaded.desandro.com/">imagesLoaded</a> plugin in order to create the layout. The initial scaffolding for the app was provided by <a href="https://github.com/vuejs/vue-cli">vue-cli</a></p>
		<p class="about-text">The source code for this site is available on <a href="https://github.com/jcampuza/vue-similar-music">Github</a></p>
	</div>
</template>

<script>
export default {
	name: 'app'
}
</script>

<style>

.about-header {
	font-size: 2em;
	font-weight: 700;
}

.about-text {
	font-size: 1.5em;
	font-weight: 400;
}

</style>