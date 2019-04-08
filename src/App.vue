<template>
  <div id="app">
    <comp-header/>
    <router-view/>
    <comp-footer/>
  </div>
</template>

<script>
import compHeader from './components/Header-Footer/Header.vue';
import compFooter from './components/Header-Footer/Footer.vue';

export default {
  name: 'app',
  components: {
    compHeader,
    compFooter
  }
}
</script>

<style>
  @import url("./assets/style.css");
</style>
