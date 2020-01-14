<template>
  <b-container fluid id="app" class="p-0">
    <!-- <NotificationContainer /> -->
    <router-view />
  </b-container>
  <!-- <div class="red">HELLO</div> -->
</template>

<script>
// import NotificationContainer from '@/components/NotificationContainer.vue'
export default {
  /* components: {
    NotificationContainer
  } */
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}
/* .red {
  background-color: red;
  color: white;
  min-height: 500px;
} */
</style>
