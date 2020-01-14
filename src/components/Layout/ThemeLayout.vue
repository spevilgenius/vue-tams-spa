<template>
  <div id="wrapper">
    <div id="content">
      <theme-content></theme-content>
    </div>
  </div>
</template>
<script>
import ThemeContent from './ThemeContent.vue'
export default {
  name: 'ThemeLayout',
  components: {
    ThemeContent
  }
}
</script>
<style lang="scss"></style>
