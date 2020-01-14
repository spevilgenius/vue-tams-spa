/* eslint-disable */
import SupportService from '@/services/SupportService.js'
// import moment from 'moment'

export const namespaced = true

export const state = {
  causes: [],
  causecats: [],
  orgs: [],
  standards: [],
  ddstandards: [],
  mdepts: ['M'],
  loaded: false
}

export const mutations = {
  SET_CAUSES(state, causes) {
    state.causes = causes
    console.log("SET_CAUSES")
  },
  SET_CAUSECATS(state, causecats) {
    state.causecats = causecats
    console.log("SET_CAUSECATS")
  },
  SET_ORGS(state, orgs) {
    state.orgs = orgs
    console.log("SET_ORGS")
  },
  SET_STANDARDS(state, standards) {
    state.standards = standards
    // state.ddstandards = ddstandards
    console.log("SET_STANDARDS " + standards.length)
  },
  SET_MDEPTS(state, mdepts) {
    state.mdepts = mdepts
    console.log("SET_MDEPTS")
  },
  SET_LOADED(state, loaded) {
    state.loaded = loaded
  }
}

export const actions = {
  getCauses({ commit }) {
    SupportService.getCauses()
      .then(response => {
        // TODO: Setup db.json to support dev?
        let isdev = false
        let location = String(window.location)
        if (location.indexOf('localhost') > 0) {
          isdev = true
        }
        if (isdev) {
          commit('SET_CAUSES', formatCauses(response.data))
          commit('SET_CAUSECATS', formatCauseCats(response.data))
        } else {
          // format the response from the service to match desired json format
          commit('SET_CAUSES', formatCauses(response))
          commit('SET_CAUSECATS', formatCauseCats(response))
        }
      })
      .catch(error => {
        console.log('There was an error getting causes: ', error.response)
      })
  },
  getOrgs({ commit }) {
    SupportService.getOrgs()
      .then(response => {
        // TODO: Setup db.json to support dev?
        let isdev = false
        let location = String(window.location)
        if (location.indexOf('localhost') > 0) {
          isdev = true
        }
        if (isdev) {
          commit('SET_ORGS', formatOrgs(response.data))
          commit('SET_LOADED', true)
        } else {
          // format the response from the service to match desired json format
          commit('SET_ORGS', formatOrgs(response))
          // Assume this will be the longest to load as it has the most data and set the loaded state after it is commited
          commit('SET_LOADED', true)
        }
      })
      .catch(error => {
        console.log('There was an error getting orgs: ', error.response)
      })
  },
  getMilestones({ commit }) {
    SupportService.getMilestones()
      .then(response => {
        // TODO: Setup db.json to support dev?
        let isdev = false
        let location = String(window.location)
        if (location.indexOf('localhost') > 0) {
          isdev = true
        }
        if (isdev) {
          commit('SET_STANDARDS', formatStandards(response.data))
        } else {
          // format the response from the service to match desired json format
          commit('SET_STANDARDS', formatStandards(response))
        }
      })
      .catch(error => {
        console.log('There was an error getting standard milestones: ', error.response)
      })
  }
}

export const getters = {
  getCausesByCat: state => cat => {
    return state.causes.find(causes => causes.cat === cat)
  },
  getCauseCats(state) {
    return state.causecats
  },
  getStandards(state) {
    return state.standards
  }
}

function formatCauses(j) {
    var p = []
    for (var i = 0; i < j.length; i++) {
        p.push({
            "value": j[i]["Title"],
            "text": j[i]["Title"],
            "cat": j[i]["Category"]
        });
    }
    return p
}

function formatCauseCats(j) {
    var p = []
    for (var i = 0; i < j.length; i++) {
        if (p.indexOf(j[i]["Category"]) < 0) {
            p.push(j[i]["Category"]);
        }
    }
    return p
}

function formatOrgs(j) {
  var p = []
  for (var i = 0; i < j.length; i++) {
    p.push(j[i]["Branch"]);
  }
  return p
}

function formatMilestones(j) {
  var p = []
  for (var i = 0; i < j.length; i++) {
    p.push({
      "text": j[i]["Title"],
      "value": j[i]["Title"],
      "phase": j[i]["Phase"],
      "dept": j[i]["Dept"]
    });
  }
  return p
}

function formatStandards(j) {
  var p = []
  for (var i = 0; i < j.length; i++) {
    p.push({
      "text": j[i]["Title"],
      "value": j[i]["Title"],
      "phase": j[i]["Phase"],
      "dept": j[i]["Dept"],
      "ID": j[i]["ID"]
    });
  }
  return p
}
