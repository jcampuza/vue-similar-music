<template>
  <div>
    <nav>
      <a href="#/">Home</a>
      <a href="#/about">About</a>
    </nav>
    <div class="container">
      <h1 class="text-center">
        Similar Music
      </h1>
      <router-view 
        class="view" 
        keep-alive 
        transition 
        transition-mode="out-in">
      </router-view>
    </div>
  </div>
</template>

<script>
import Search from './components/Search'

export default {
  name: 'app',
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
  background-color: #f5f5f5;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  font-family: Source Sans Pro, Helvetica, sans-serif;
}

/* link styles */
a {
  text-decoration: none;
  color: #e81c4f;
  font-size: 1em;
}
a:active, a:focus {
  color: #e81c4f;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
  color: #e81c4f;
}
/* end links */

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

h1 {
  color: #e81c4f;
  text-outline: ;
}

.container {
  margin-top: 50px;
}

.view {
  transition: opacity .2s ease;
}

.view.v-enter, .view.v-leave{
  opacity: 0;
}

</style>
