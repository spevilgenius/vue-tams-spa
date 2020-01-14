/* eslint-disable */
import RebaselineService from '@/services/RebaselineService.js'
import moment from 'moment'

export const namespaced = true

let location = String(window.location)
let isdev = false

if (location.indexOf('localhost') >= 0) {
  isdev = true
}

let causes = []
let cats = []

function predicateBy(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1
    } else if (a[prop] < b[prop]) {
      return -1
    }
    return 0
  }
}

export const state = {
  rebaselines: [],
  allrebaselines: [],
  rebaselinesTotal: 0,
  loaded: false,
  loading: false,
  drawn: false,
  drawing: true,
  months: [
    '10',
    '11',
    '12',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    'No Month'
  ]
}

export const mutations = {
  SET_REBASELINES(state, rebaselines) {
    state.rebaselines = rebaselines
    console.log(rebaselines.length + ' Rebaselines added to store')
  },
  SET_ALL_REBASELINES(state, rebaselines) {
    state.allrebaselines = rebaselines
  },
  SET_REBASELINES_TOTAL(state, pt) {
    state.rebaselinesTotal = pt
  },
  SET_DRAWN(state, drawn) {
    state.drawn = drawn
  },
  SET_DRAWING(state, drawing) {
    state.drawing = drawing
  },
  SET_LOADED(state, loaded) {
    state.loaded = loaded
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_SORTED(state, sorted) {
    state.sorted = sorted
  }
}

export const actions = {
  getRebaselines({ state, commit, rootState }) {
    // This will not be loaded until projects are loaded so that we can merge the data into the rebaselines array
    commit('SET_LOADING', true)
    RebaselineService.getRebaselines()
      .then(response => {
        let isdev = false
        let location = String(window.location)
        if (location.indexOf('localhost') > 0) {
          isdev = true
        }
        if (isdev) {
          var m = response.data // format the response from the service to match desired json format
          commit('SET_REBASELINES_TOTAL', parseInt(response.data.length))
          commit('SET_REBASELINES', m)
          commit('SET_ALL_REBASELINES', m)
          commit('SET_LOADED', true)
          commit('SET_LOADING', false)
        } else {
          // SharePoint
          var m = formatRebaselines(response) // format the response from the service to match desired json format
          commit('SET_REBASELINES_TOTAL', parseInt(response.length))
          commit('SET_REBASELINES', m)
          commit('SET_ALL_REBASELINES', m)
          commit('SET_LOADED', true)
          commit('SET_LOADING', false)
        }
      })
      .catch(error => {
        // TODO: Let the user know!!
        console.log(
          'Rebaseline Store--There was an error getting rebaselines: ',
          error
        )
      })
  },
  setDrawn({ commit }, drawn) {
    commit('SET_DRAWN', drawn)
  },
  setDrawing({ commit }, drawing) {
    commit('SET_DRAWING', drawing)
  }
}

function buildRebaseline(title, erpdr) {
  let M = {
    ERPDR: erpdr,
    ProjectTitle: title,
    Dept: '',
    Div: '',
    ProjectManager: '',
    FY: '',
    month: '',
    RebaselineDate: '',
    RootCauseCat: '',
    RootCause: ''
  }
  return M
}

function formatRebaselines(j) {
  var p = []
  // just loop and create the array with better keys
  console.log('FORMATTING ' + j.length + ' REBASELINES')
  var m = null
  var fy = null
  var month = null
  for (var i = 0; i < j.length; i++) {
    m = buildRebaseline(j[i]['ERPDR']['ProjectTitle'], j[i]['ERPDR']['Title'])
    m.Dept = j[i]['PjMCode']['Title']
    m.Div = j[i]['PjMCode']['Div']
    m.ProjectManager = j[i]['ProjectManager']['Title']
    if (moment(j[i]['RebaselineDate']).isValid()) {
      m.RebaselineDate = j[i]['RebaselineDate']
      fy = moment(j[i]['RebaselineDate']).get('year')
      month = moment(j[i]['RebaselineDate']).get('month') + 1
      if (month <= 9) {
        month = String('0' + month)
      } else {
        month = String(month)
        fy += 1
      }
      m.month = month
      m.FY = fy
      m.RootCauseCat = j[i]['NewRebaselineRootCauseCat']['Title']
      m.RootCause = j[i]['NewRebaselineRootCause']['Title']
    } else {
      
    }
    p.push(m)
  }
  p = p.sort(predicateBy('ERPDR'))
  return p
}
