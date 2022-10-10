<template>
  <!-- <HelloWorld /> -->
  <!-- <movie/> -->
  <!-- <hello/> -->
  <shop/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import movie from './components/movie.vue'
import hello from './components/hello.vue'
import shop from './components/shop.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    movie,
    hello,
    shop
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
