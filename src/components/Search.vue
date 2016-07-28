<template>
  <div>
    <form class="search-form center" v-on:submit.prevent="submit(searchString)">
      <input class="search-input" type="text" name="artistSearch" v-model="searchString" placeholder="Search for an artist/band">
      <button type="button" class="submit-button" v-on:click="submit(searchString)"><i class="fa fa-search"></i></button>
    </form>
    <div class="grid">
      <artist v-for="artist in artists" :artist="artist"></artist>
    </div>
  </div>
</template>

<script>
// import Hello from './components/Hello'
import Artist from './Artist'

export default {

  name: 'search',

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

form {
  width: 75%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.search-input {
  flex-grow: 2;
  padding: 9px;
  font-size: 1.5em;
  border: 1px solid #bbbbbb;
  box-shadow: none;
  box-sizing: border-box;
}

.search-input:focus {
  border: 1px solid #2b2b2b;
  outline: 0;
}

.submit-button {
  position: relative;
  left: -1px;
  padding: 9px;
  font-size: 1.5em;
  background-color: #2b2b2b;
  color: #d1d1d1;
  border: 1px solid #727272;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  width: 10%;
  min-width: 55px;
  transition: color .1s ease-out;
  opacity: 0.8;
}


.search-input:focus + .submit-button {
  opacity: 1;
  color: #e81c4f;
}

.grid {
  margin-top: 1%;
}

</style>
