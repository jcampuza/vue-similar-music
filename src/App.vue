<template>
<nav>
  <a href="#">Home</a>
  <a href="#">About</a>
</nav>
  <div id="app">
  <div class="container">
    <h1 class="text-center">
      Similar Music
    </h1>
    <form class="search-form center" v-on:submit.prevent="submit(searchString)">
      <input class="search-input" type="text" name="artistSearch" v-model="searchString" placeholder="Search for an artist/band">
      <button type="button" class="submit-button" v-on:click="submit(searchString)">Submit</button>
    </form>
    <div class="">
      <div class="grid">
        <artist v-for="artist in artists" :artist="artist"></artist>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
// import Hello from './components/Hello'
import Artist from './components/Artist'

export default {

  name: 'app',

  data () {
    return {
      artistID: null,
      artists: {},
      searchString: ''
    }
  },

  components: {
    Artist
  },

  methods: {
    submit: function(searchString) {
      console.log(searchString);
      this.$http.get('https://api.spotify.com/v1/search?q=' + searchString + '&type=artist&limit=5').then((response) => {
        if (response.data.artists.items[0] === undefined) {
          console.log('no artists found');
        } else {
          this.artistID = response.data.artists.items[0].id;
          console.log(this.artistID);
          this.findRelatedArtists(this.artistID);
        }
      }, (response) => {
        console.log('unable to get artist');
      })
    },

    findRelatedArtists: function(id) {
      this.$http.get('https://api.spotify.com/v1/artists/' + id + '/related-artists').then((response) => {
        this.artists = response.data.artists;
        console.log(response);  
      });
    }
  }
}

window.onload = function() {
  var nav = document.getElementsByTagName('nav')[0];
  window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop || document.body.scrollTop == 0) {
      nav.style.opacity = 1;
      console.log('changed');
    } else {
      nav.style.opacity = 0.8;
    }
  });
}

</script>

<style>
html {
  height: 100%;
  font-size: 20px;
}

body {
  background-color: #dfdfdf;
  font-size: 14px;
  line-height: 1.4;
}

a {
  text-decoration: none;
  color: rgb(25, 200, 70);
  font-size: 1em;
}

nav {
  position: fixed;
  top: 0;
  background-color: #2b2b2b;
  width: 100%;
  padding: 10px;
  z-index: 2;
  transition: opacity .3s;
}
nav a {
  font-size: 1.5em;
  margin-left: 20px;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  margin-top: 50px;
}

h1 {
  color:rgb(25,200,70);
  text-outline: ;
}

form {
  width: 75%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #efefef;
}

.search-input {
  flex-grow: 2;
  padding: 8px;
  font-size: 1.5em;
  margin-right: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.search-input:focus {
  outline: none;
  outline-style: solid;
  outline-width: 1px;
  outline-color: rgb(25,70,20);
}

.submit-button {
  position: relative;
  left: -1px;
  padding: 8px;
  font-size: 1.5em;
  margin: 0;
  background-color: #2b2b2b;
  color: #727272;
  border: 1px solid #727272;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}


.search-input:focus + .submit-button {
  background-color: #1a871c;
  color: #dfdfdf;
}

.container {
}

</style>
