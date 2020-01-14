<template>
  <b-container>
    <b-row class="m-0 mt-1">
      <b-col md="12" class="p-0">
        <b-nav tabs class="tabsArea">
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'ProjectsData'">Project Data</b-nav-item>
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'ProjectsOnTimeByYear'">Projects OnTime By Year</b-nav-item>
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'ProjectsOnTimeByMonth'">Projects OnTime By Month</b-nav-item>
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'MilestonesData'">Milestone Data</b-nav-item>
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'MilestonesOnTimeByYear'">Milestones OnTime By Year</b-nav-item>
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'MilestonesOnTimeByMonth'">Milestones OnTime By Month</b-nav-item>
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'MilestonesCompletedByMonth'">Milestones Completed By Month</b-nav-item>
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'MSRootCauseCategories'">Milestone Root Causes</b-nav-item>
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'RebaselineData'">Rebaseline Data</b-nav-item>
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'RebaselineRootCauses'">Rebaseline Root Causes</b-nav-item>
          <!-- 
          <b-nav-item class="navTab" active-class="activeTab" exact-active-class="exactTab" link-classes="tabLink" :to="'Top5RootCauseCategories'">Top 5</b-nav-item> -->
        </b-nav>
        <div class="main-panel">
          <tabs></tabs>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
export default {
  name: 'DashboardLayout',
  computed: {
    projectsloaded() {
      return this.$store.state.milestone.projectsloaded
    },
    projectsloading() {
      return this.$store.state.milestone.projectsloading
    },
    milestonesloaded() {
      return this.$store.state.milestone.loaded
    },
    milestonesloading() {
      return this.$store.state.milestone.loading
    },
    drawing() {
      return this.$store.state.milestone.drawing
    }
  },
  data: function() {
    return {
      isdev: false,
      tabIndex: 0
    }
  },
  updated: function() {
    console.log('DASHBOARD LAYOUT UPDATED')
  },
  mounted: function() {
    this.$nextTick(function() {
      if (!this.projectsloaded) {
        const notification = {
          type: 'info',
          message: 'Getting Projects, please wait'
        }
        this.$store.dispatch('notification/add', notification, { root: true })
        this.$store.dispatch('support/getCauses')
        this.$store.dispatch('milestone/getProjects')
        this.$options.interval = setInterval(this.getMilestones, 1000)
      }
    })
  },
  methods: {
    getMilestones: function() {
      if (this.projectsloaded) {
        if (!this.milestonesloaded && !this.milestonesloading) {
          // clear the interval and get the milestones
          clearInterval(this.$options.interval)
          this.$store.dispatch('rebaseline/getRebaselines')
          this.$store.dispatch('milestone/getMilestones')
          const notification = {
            type: 'info',
            message: 'Getting Milestones, please wait'
          }
          this.$store.dispatch('notification/add', notification, { root: true })
        }
      }
    }
  },
  components: {
    Tabs
  }
}
</script>

<style scoped>
.nav-tabs {
  border-bottom: none;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: black;
  background-color: #fff;
  text-decoration: underline;
  border-color: black;
  border-bottom: none;
}
.nav-tabs .nav-link {
  border: none;
}
.nav-link {
  display: block;
  padding: 0.5rem 1rem;
}
.tabLink {
  border-bottom: 2px solid black !important;
}
.exactTab .tabLink {
  border-bottom: none;
}
.main-panel {
  border: 2px solid black;
  padding-top: 10px;
  margin-top: -1px;
}
.tabsArea {
  background-color: #aaaaaa;
}
.navTab {
  background-color: white;
}
.exactTab {
  border-left: 2px solid black !important;
  border-top: 2px solid black !important;
  border-right: 2px solid black !important;
  border-bottom: none !important;
}
</style>
