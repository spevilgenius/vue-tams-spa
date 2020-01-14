<template>
  <div class="p-0" id="News">
    <b-row class="ml-0 mr-0">
      <b-navbar toggleable="md" type="dark" variant="dark" class="fullnavbar">
        <h3 class="newsbar">News</h3>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-button-toolbar key-nav aria-label="Toolbar">
                <b-button-group class="mx-1">
                  <b-button class="annbtn"><font-awesome-icon fas icon="angle-double-left" class="icon" @click="slideme('first', '')"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="angle-left" class="icon" @click="slideme('prev', '')"></font-awesome-icon></b-button>
                </b-button-group>
                <b-button-group class="mx-1">
                  <b-button class="annbtn"><font-awesome-icon fas icon="circle" :class="getclass('icon', 0)" @click="slideme('goto', 0)"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="circle" :class="getclass('icon', 1)" @click="slideme('goto', 1)"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="circle" :class="getclass('icon', 2)" @click="slideme('goto', 2)"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="circle" :class="getclass('icon', 3)" @click="slideme('goto', 3)"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="circle" :class="getclass('icon', 4)" @click="slideme('goto', 4)"></font-awesome-icon></b-button>
                </b-button-group>
                <b-button-group class="mx-1">
                  <b-button class="annbtn"><font-awesome-icon fas icon="angle-right" class="icon" @click="slideme('next', '')"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="angle-double-right" class="icon" @click="slideme('last', '')"></font-awesome-icon></b-button>
                </b-button-group>
              </b-button-toolbar>
              <b-dropdown no-caret right>
                <template slot="button-content" class="annbtn">
                  <font-awesome-icon fas icon="cog" class="icon"></font-awesome-icon>
                </template>
                <b-dropdown-item href="/Lists/News/AllItems.aspx">All Items</b-dropdown-item>
                <b-dropdown-item href="/Lists/News/NewForm.aspx">New Item</b-dropdown-item>
              </b-dropdown>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-row>
    <b-row class="ml-0 mr-0">
      <b-carousel id="carousel" v-model="slide" :interval="10000" background="#ffffff" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
        <b-carousel-slide v-for="item in news" :key="item.id">
          <template v-slot:img>
            <b-card no-body class="overflow-hidden">
              <b-row no-gutters>
                <div class="div-image">
                  <b-card-img :src="item.image" class="rounded-0"></b-card-img>
                </div>
                <div class="div-body">
                  <b-card-body :title="item.title">
                    <b-card-text> The {{ item.project }} Team performed a {{ item.activity }} involving {{ item.poc }} at {{ item.location }}. The impact of this activity is {{ item.impact }} </b-card-text>
                  </b-card-body>
                </div>
              </b-row>
            </b-card>
          </template>
        </b-carousel-slide>
      </b-carousel>
    </b-row>
  </div>
</template>

<script>
import NewsService from '@/services/NewsService.js'
import { isNullOrUndefined } from 'util'

export default {
  name: 'News',
  data: function() {
    return {
      loaded: false,
      news: [],
      page: null,
      slide: 0,
      sliding: null
    }
  },
  mounted: function() {
    this.$options.interval = setInterval(this.getNews, 2000)
  },
  methods: {
    getNews: function() {
      console.log('Getting News...')
      var vm = this
      clearInterval(this.$options.interval)
      NewsService.getNews()
        .then(response => {
          console.log('News RETURNED ' + response.length)
          let isdev = false
          let location = String(window.location)
          if (location.indexOf('localhost') > 0) {
            isdev = true
          }
          if (isdev) {
            if (response.data.length > 0) {
              vm.loaded = true
              vm.drawNews(response.data)
            }
          } else {
            if (response.length > 0) {
              vm.loaded = true
              vm.drawNews(response)
            }
          }
        })
        .catch(error => {
          console.log('There was an error getting News: ', error)
        })
    },
    getclass: function(type, data) {
      // for this type = icon for now but can be expanded later if needed
      // data for now is just the index
      let c = 'icon'
      switch (type) {
        case 'icon':
          // determine the current slide and act accordingly
          switch (true) {
            case this.slide === data:
              c += ' icon-active'
              break
          }
          break
      }
      return c
    },
    slideme: function(action, slide) {
      switch (action) {
        case 'prev':
          if (this.slide === 0) {
            this.slide = 4
          } else {
            this.slide = this.slide - 1
          }
          break

        case 'next':
          if (this.slide === 4) {
            this.slide = 0
          } else {
            this.slide = this.slide + 1
          }
          break

        case 'first':
          this.slide = 0
          break

        case 'last':
          this.slide = this.News.length - 1
          break

        case 'goto':
          this.slide = slide
          break
      }
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    drawNews: function(j) {
      console.log('DRAWING News')
      let isdev = false
      let location = String(window.location)
      if (location.indexOf('localhost') > 0) {
        isdev = true
      }
      if (isdev) {
        for (let i = 0; i < j.length; i++) {
          this.news.push({
            id: j[i]['id'],
            image: 'https://picsum.photos/id/' + j[i]['id'] + '/300/300',
            title: j[i]['title'],
            project: j[i]['project'],
            activity: j[i]['activity'],
            poc: j[i]['poc'],
            location: j[i]['location'],
            impact: j[i]['impact']
          })
        }
        /* this.news = j */
      } else {
        for (let i = 0; i < j.length; i++) {
          this.news.push({
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

<style lang="scss">
.fullnavbar {
  width: 100%;
  background-color: black !important;
}
#News {
  margin-top: 10px;
}
#News .newsbar {
  line-height: normal;
  color: #ffffff;
  margin-left: 10px;
  margin-top: 10px;
}
#News .btn-secondary,
.annbtn {
  min-width: 25px !important;
  background-color: black !important;
  border: none;
}
#News .carousel {
  width: 100%;
}
#News .carousel-inner {
  height: 300px;
}
#News .carousel-item {
  height: 300px;
}
#News .div-image {
  height: 300px;
  width: 300px;
  display: inline-block;
}
#News .div-body {
  height: 300px;
  width: calc(100% - 300px);
  display: inline-block;
}
#News .card {
  height: 300px;
}
#News .card-text {
  color: black;
  font-size: 16px;
}
#News .carousel-caption {
  position: absolute;
  right: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  z-index: 10;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  color: #fff;
  text-align: center;
}
#News .icon {
  color: white;
}
#News .icon-active {
  color: red;
}
</style>
