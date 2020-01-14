<template>
  <b-container fluid>
    <b-row>
      <b-col class="red" md="3" xs="12"><hulls /></b-col>
      <!-- <b-col class="red" md="3" xs="12"></b-col> -->
      <b-col md="9" xs="12">
        <b-container fluid>
          <b-row>
            <b-col class="blue" xs="12">GANTT CHART</b-col>
          </b-row>
          <b-row>
            <b-col class="green" md="8" xs="12">MAIN AREA</b-col>
            <b-col class="yellow" md="4" xs="12">RIGHT AREA</b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Hulls from '@/components/Hulls/Hulls.vue'
/* export default {
  name: 'home'
} */

export default {
  name: 'home',
  components: {
    Hulls
  }
}
</script>

<style>
.red {
  background-color: red;
  color: white;
  min-height: 500px;
}
.blue {
  background-color: blue;
  color: white;
  min-height: 100px;
}
.green {
  background-color: green;
  color: white;
  min-height: 400px;
}
.yellow {
  background-color: yellow;
  min-height: 400px;
}
</style>
