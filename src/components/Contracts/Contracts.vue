<template>
  <div class="p-0" id="Contracts">
    <b-row class="ml-0 mr-0">
      <b-navbar toggleable="md" type="dark" variant="dark" class="fullnavbar">
        <h3 class="contractsbar">Contracts</h3>
      </b-navbar>
    </b-row>
    <b-row class="ml-0 mr-0 mb-1" v-for="bar in contracts" :key="bar.id">
      <b-col xs="1" class="pt-1">{{ bar.company }}</b-col>
      <b-col xs="11" class="pt-1">
        <b-progress :value="bar.status"></b-progress>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ContractsService from '@/services/ContractsService.js'
export default {
  name: 'Contracts',
  data: function() {
    return {
      loaded: false,
      contracts: [],
      max: 100
    }
  },
  mounted: function() {
    this.$options.interval = setInterval(this.getContracts, 1000)
  },
  methods: {
    getContracts: function() {
      console.log('Getting Contracts...')
      var vm = this
      clearInterval(this.$options.interval)
      ContractsService.getContracts()
        .then(response => {
          console.log('Contracts RETURNED ' + response.length)
          let isdev = false
          let location = String(window.location)
          if (location.indexOf('localhost') > 0) {
            isdev = true
          }
          if (isdev) {
            if (response.data.length > 0) {
              vm.loaded = true
              vm.drawContracts(response.data)
            }
          } else {
            if (response.length > 0) {
              vm.loaded = true
              vm.drawContracts(response)
            }
          }
        })
        .catch(error => {
          console.log('There was an error getting Contracts: ', error)
        })
    },
    drawContracts: function(j) {
      console.log('DRAWING News')
      let isdev = false
      let location = String(window.location)
      if (location.indexOf('localhost') > 0) {
        isdev = true
      }
      if (isdev) {
        for (let i = 0; i < j.length; i++) {
          this.contracts.push({
            id: j[i]['id'],
            company: j[i]['company'],
            manager: j[i]['manager'],
            ponumber: j[i]['ponumber'],
            status: j[i]['status']
          })
        }
        /* this.news = j */
      } else {
        for (let i = 0; i < j.length; i++) {
          this.contracts.push({
            id: j[i]['id'],
            title: j[i]['Title'],
            project: j[i]['Project'],
            activity: j[i]['Activity'],
            poc: j[i]['Poc'],
            location: j[i]['Location'],
            impact: j[i]['Impact']
            // image: j[i]['SliderImage']['Url']
          })
        }
      }
      this.loaded = false // reset for page reloads
    },
    beforeDestroy() {
      clearInterval(this.$options.interval)
    }
  }
}
</script>

<style lang="scss" scoped>
.fullnavbar {
  width: 100%;
  background-color: black !important;
}
#Contracts {
  margin-top: 10px;
}
#Contracts .contractsbar {
  line-height: normal;
  color: #ffffff;
  margin-left: 10px;
  margin-top: 10px;
}
</style>
