/* eslint-disable */
import HullsService from '@/services/HullsService.js'

export const namespaced = true

export const state = {
    hulls: [],
    hull: {},
    hullsTotal: 0,
    loaded: false,
    loading: false
  }

export const mutations = {
  SET_HULLS(state, hulls) {
    state.hulls = hulls
    //console.log(hulls.length + ' HULLs added to store')
  },
  SET_HULLS_TOTAL(state, pt) {
    //console.log(pt + ' hulls found.')
    state.hullsTotal = pt
  },
  SET_LOADED(state, loaded) {
    state.loaded = loaded
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

export const actions = {
  getHulls({ commit }) {
    commit('SET_LOADING', true)
    HullsService.getHulls()
      .then(response => {
        commit('SET_HULLS_TOTAL', parseInt(response.length))
        commit('SET_HULLS', formatHulls(response))
        commit('SET_HULLS_LOADED', true)
        commit('SET_HULLS_LOADING', false)
      })
      .catch(error => {
        console.log(
          'Hulls Store--There was an error getting hulls : ',
          error
        )
      })
  }
}

function formatHulls(j) {
  var p = []
  console.log('Formatting ' + j.length + ' hulls')
  for (var i = 0; i < j.length; i++) {
    if (j[i]['Title'] !== null || j[i]['Title'] !== '') {
      p.push({
        hull: j[i]['Title'],
        name: j[i]['Name'],
        class: j[i]['ClassName'],
        fleet: j[i]['Fleet'],
        id: j[i]['Id'],
      })
    }
  }
  return p
}
