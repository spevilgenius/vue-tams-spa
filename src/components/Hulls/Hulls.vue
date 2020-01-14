<template>
  <div></div>
</template>

<script>
import HullsService from '@/services/HullsService.js'
import Hull from '@/models/Hull'

export default {
  name: 'Hulls',
  data: function() {
    return {
      loaded: false,
      hulls: [] // temp holding area
    }
  },
  mounted: function() {
    this.$options.interval = setInterval(this.getHulls, 2000)
  },
  methods: {
    getHulls() {
      console.log('Getting Hulls...')
      var vm = this
      clearInterval(this.$options.interval)
      HullsService.getHulls()
        .then(response => {
          console.log('Hulls RETURNED ' + response.length)
          if (response.length > 0) {
            vm.loaded = true
            vm.formatHulls(response)
          }
        })
        .catch(error => {
          console.log('There was an error getting Hulls: ', error)
        })
    },
    formatHulls: function(j) {
      for (let i = 0; i < j.length; i++) {
        this.hulls.push({
          id: j[i]['id'],
          title: j[i]['Title'],
          sortcode: j[i]['SortCode'],
          name: j[i]['Name'],
          classname: j[i]['ClassName'],
          fleet: j[i]['Fleet']
        })
      }
      Hull.insert({ data: this.hulls })
    }
  }
}
</script>

<style lang="scss" scoped></style>
