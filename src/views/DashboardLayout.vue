<template>
  <b-container>
    <b-row class="m-0">
      <b-col md="12" class="p-0">
        <b-card no-body>
          <keep-alive>
            <b-tabs ref="dashboardtabs" class="tabArea" card v-model="tabIndex">
              <b-tab class="mtab" active>
                <template slot="title">
                  <b-spinner type="border" small v-if="projectsloading"></b-spinner>Project Data
                </template>
                <projects-data />
              </b-tab>
              <b-tab class="mtab" title="Projects OnTime By Year">
                <projects-ontime-by-year />
              </b-tab>
              <b-tab class="mtab" title="Projects OnTime By Month">
                <projects-ontime-by-month />
              </b-tab>
              <b-tab class="mtab" title="Project Rebaselines By Month">
                <rebaselines-by-month />
              </b-tab>
              <b-tab class="mtab">
                <template slot="title">
                  <b-spinner type="border" small v-if="milestonesloading"></b-spinner>Milestone Data
                </template>
                <milestones-data />
              </b-tab>
              <b-tab class="mtab" title="Milestones OnTime By Year">
                <milestones-ontime-by-year />
              </b-tab>
              <b-tab class="mtab" title="Milestones OnTime By Month">
                <milestones-ontime-by-month />
              </b-tab>
              <b-tab class="mtab" title="Milestones Completed By Month">
                <milestones-completed-by-month />
              </b-tab>
              <b-tab class="mtab" title="Milestone RootCause Categories">
                <rootcauses />
              </b-tab>
              <!-- <b-tab title="Top 5 Milestone RootCause Categories">
              <top-five />
            </b-tab> -->
            </b-tabs>
          </keep-alive>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MilestonesOnTimeByYear from '@/components/MilestonesOnTimeByYear2.vue'
import MilestonesOnTimeByMonth from '@/components/MilestonesOnTimeByMonth2.vue'
import MilestonesCompletedByMonth from '@/components/MilestonesCompletedByMonth2.vue'
import ProjectsOnTimeByYear from '@/components/ProjectsOnTimeByYear2.vue'
import ProjectsOnTimeByMonth from '@/components/ProjectsOnTimeByMonth2.vue'
import MilestonesData from '@/components/MilestonesData.vue'
import ProjectsData from '@/components/ProjectsData.vue'
import RebaselinesByMonth from '@/components/RebaselinesByMonth.vue'
import RootCauses from '@/components/RootCauseCategories.vue'
// import TopFiveRootCauseCategories from '@/components/Top5RootCauseCategories.vue'

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
      if (this.projectsloading) {
        // set to false by default so we can set it once we start loading and then not keep doing it when the component changes
      } else if (!this.projectsloaded) {
        this.$store.dispatch('milestone/getProjects')
        this.$store.dispatch('support/getCauses')
        const notification = {
          type: 'info',
          message: 'Getting Projects, please wait'
        }
        this.$store.dispatch('notification/add', notification, { root: true })
      }
    })
  },
  components: {
    'milestones-ontime-by-year': MilestonesOnTimeByYear,
    'milestones-ontime-by-month': MilestonesOnTimeByMonth,
    'milestones-completed-by-month': MilestonesCompletedByMonth,
    'projects-ontime-by-year': ProjectsOnTimeByYear,
    'projects-ontime-by-month': ProjectsOnTimeByMonth,
    'milestones-data': MilestonesData,
    'projects-data': ProjectsData,
    'rebaselines-by-month': RebaselinesByMonth,
    rootcauses: RootCauses
    /* 'top-five': TopFiveRootCauseCategories */
  }
}
</script>

<style scoped></style>
