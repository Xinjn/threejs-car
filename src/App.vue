<template>
    <Car msg="Welcome to Your Vue.js App"/>
</template>

<script>

import Car from './components/Car.vue'

export default {
  name: 'App',
  components: {
    Car
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

</style>
