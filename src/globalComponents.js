/* eslint-disable */
import Card from './components/Cards/Card.vue'

const GlobalComponents = {
  install (Vue) {
    Vue.component('card', Card)
  }
}

export default GlobalComponents
