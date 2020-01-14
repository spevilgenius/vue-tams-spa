/* eslint-disable */
import ProjectService from '@/services/ProjectService.js'
import MilestoneService from '@/services/MilestoneService.js'
import UtilityService from '@/services/UtilityService.js'
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
  projects: [],
  project: {},
  projectsTotal: 0,
  milestones: [],
  filteredmilestones: [],
  allmilestones: [],
  sorted: [],
  milestone: {},
  milestonesTotal: 0,
  projectsloaded: false,
  projectsloading: false,
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
  SET_PROJECTS(state, projects) {
    state.projects = projects
    //console.log(projects.length + ' Projects added to store')
  },
  SET_PROJECTS_TOTAL(state, pt) {
    //console.log(pt + ' projects found.')
    state.projectsTotal = pt
  },
  SET_MILESTONES(state, milestones) {
    state.milestones = milestones
    console.log(milestones.length + ' Milestones added to store')
  },
  SET_ALL_MILESTONES(state, milestones) {
    state.allmilestones = milestones
  },
  SET_LATE_MILESTONES(state, milestones) {
    state.latemilestones = milestones
  },
  SET_MILESTONES_TOTAL(state, pt) {
    state.milestonesTotal = pt
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
  SET_PROJECTS_LOADED(state, loaded) {
    state.projectsloaded = loaded
  },
  SET_PROJECTS_LOADING(state, loading) {
    state.projectsloading = loading
  },
  SET_SORTED(state, sorted) {
    state.sorted = sorted
  }
}

export const actions = {
  getProjects({ commit }) {
    //console.log('Calling Project Service')
    commit('SET_PROJECTS_LOADING', true)
    ProjectService.getProjects()
      .then(response => {
        let isdev = false
        let location = String(window.location)
        if (location.indexOf('localhost') > 0) {
          isdev = true
        }
        if (isdev) {
          commit('SET_PROJECTS_TOTAL', parseInt(response.data.length))
          commit('SET_PROJECTS', response.data)
          commit('SET_PROJECTS_LOADED', true)
          commit('SET_PROJECTS_LOADING', false)
        } else {
          commit('SET_PROJECTS_TOTAL', parseInt(response.length))
          commit('SET_PROJECTS', formatProjects(response))
          commit('SET_PROJECTS_LOADED', true)
          commit('SET_PROJECTS_LOADING', false)
        }
      })
      .catch(error => {
        console.log(
          'Milestone Store--There was an error getting projects : ',
          error
        )
      })
  },
  getMilestones({ state, commit, rootState }) {
    // This will not be loaded until projects are loaded so that we can merge the data into the milestones array
    causes = rootState.support.causes
    cats = rootState.support.causecats
    //console.log('Calling Milestone Service')
    commit('SET_LOADING', true)
    MilestoneService.getMilestones()
      .then(response => {
        // Service already formats DEV but DEV has a different response type so the return is slightly different
        let isdev = false
        let location = String(window.location)
        if (location.indexOf('localhost') > 0) {
          isdev = true
        }
        if (isdev) {
          var m = formatMilestones(response.data) // format the response from the service to match desired json format
          commit('SET_MILESTONES_TOTAL', parseInt(response.data.length))
          commit('SET_MILESTONES', m)
          commit('SET_ALL_MILESTONES', m)
          commit('SET_LOADED', true)
          commit('SET_LOADING', false)
        } else {
          // SharePoint
          var m = formatMilestones(response) // format the response from the service to match desired json format
          commit('SET_MILESTONES_TOTAL', parseInt(response.length))
          commit('SET_MILESTONES', m)
          commit('SET_ALL_MILESTONES', m)
          commit('SET_LOADED', true)
          commit('SET_LOADING', false)
        }
      })
      .catch(error => {
        // TODO: Let the user know!!
        console.log(
          'Milestone Store--There was an error getting milestones: ',
          error
        )
      })
  },
  setFiltered({ commit }, milestones) {
    // need to reset all filters and filtered milestones based on the passed in set of filtered milestones
    // this will be a first in subtractive filter meaning that each filter will remove items based on the first choice and then second choice etc
    // a different function for
  },
  setDrawn({ commit }, drawn) {
    commit('SET_DRAWN', drawn)
  },
  setDrawing({ commit }, drawing) {
    commit('SET_DRAWING', drawing)
  }
}

export const getters = {
  getLateMilestones: state => {
    return state.allmilestones.filter(milestone => milestone.rcc !== '')
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function formatProjects(j) {
  var p = []
  // just loop and create the array with better keys
  if (isdev) {
    // add to p array just in case additions are needed later
    for (var i = 0; i < j.length; i++) {
      p.push(j[i])
    }
  } else {
    console.log('Formatting ' + j.length + ' projects')
    for (var i = 0; i < j.length; i++) {
      if (j[i]['Title'] !== null || j[i]['Title'] !== '') {
        var fy = ''
        var month = ''
        var ontime = 0
        if (moment(j[i]['PlannedFinish']).isValid()) {
          fy = moment(j[i]['PlannedFinish']).get('year')
          month = moment(j[i]['PlannedFinish']).get('month') + 1
          if (month <= 9) {
            month = String('0' + month)
          } else {
            fy += 1
          }
          // console.log('fy: ' + fy, ', month: ' + month)
          if (moment(j[i]['ActualFinish']).isValid()) {
            var af = moment(j[i]['ActualFinish'])
            var pf = moment(j[i]['PlannedFinish'])
            if (pf.isSameOrAfter(af)) {
              ontime = 1
            }
          }
        } else {
          fy = 'No Date'
          month = 'No Month'
        }
        p.push({
          erpid: j[i]['Title'],
          title: j[i]['ProjectTitle'],
          id: j[i]['Id'],
          dept: j[i]['DeptText'],
          div: j[i]['PjMCode']['Div'],
          pjm: j[i]['PjMCode']['Branch'],
          level: j[i]['ProjectLevelShort'],
          manager: j[i]['PM']['Title'],
          sponsor: j[i]['ERPResourceSponsor']['Title'],
          FY: fy,
          month: month,
          pstart: moment(j[i]['PlannedStart']).isValid()
            ? moment(j[i]['PlannedStart']).format('MM/DD/YYYY')
            : '',
          astart: moment(j[i]['ActualStart']).isValid()
            ? moment(j[i]['ActualStart']).format('MM/DD/YYYY')
            : '',
          pfinish: moment(j[i]['PlannedFinish']).isValid()
            ? moment(j[i]['PlannedFinish']).format('MM/DD/YYYY')
            : '',
          afinish: moment(j[i]['ActualFinish']).isValid()
            ? moment(j[i]['ActualFinish']).format('MM/DD/YYYY')
            : '',
          complete: moment(j[i]['ActualFinish']).isValid() ? true : false,
          planned: fy !== '' ? 1 : 0,
          ontime: ontime
        })
      }
    }
  }
  return p
}

function buildMilestone(title, erpid, length) {
  let M = {
    _rowVariant: '',
    index: 0,
    guid: Math.uuid(),
    id: 0,
    cd: '',
    erpid: erpid,
    ptitle: '',
    dept: '',
    div: '',
    pjm: '',
    level: '',
    manager: '',
    title: title,
    FY: '',
    month: '',
    mdps: '',
    mdpf: '',
    mdas: '',
    mdaf: '',
    status: '',
    rcc: '',
    rc: '',
    complete: 0,
    ontime: 0,
    planned: 0
  }
  return M
}

function formatMilestones(j) {
  var p = []
  console.log('ROOTSTATE CAUSES: ' + causes.length)
  // just loop and create the array with better keys
  for (var i = 0; i < j.length; i++) {
    var m = null,
      prj = null,
      fy = null
    if (isdev) {
      prj = state.projects.filter(project => project.erpid === j[i].erpid)
    } else {
      prj = state.projects.filter(project => project.erpid === j[i]['ERPID'])
      if (prj.length <= 0) {
        console.log('NO PROJECT EXISTS FOR ERPID: ' + j[i]['ERPID'])
        // DONE: This does happen in production so set up an empty project for it
        prj.push({
          title: 'No Title',
          dept: 'No Dept',
          div: 'No Div',
          pjm: 'No PjM',
          level: 'No Level',
          manager: 'No Manager'
        })
      }
    }
    if (isdev) {
      fy = j[i].FY
    } else {
      if (j[i]['FiscalYear'] !== '' || j[i]['FiscalYear'] !== undefined) {
        fy = j[i]['FiscalYear']
      } else {
        fy = 'No Date'
      }
    }
    if (isdev) {
      m = buildMilestone(j[i].title, j[i].erpid, i)
    } else {
      m = buildMilestone(j[i]['MilestoneTitle'], j[i]['ERPID'], i)
    }
    m.index = i
    m.id = isdev ? j[i].id : j[i]['ID']
    m.ptitle = prj[0].title
    m.dept = prj[0].dept
    m.div = prj[0].div
    m.pjm = prj[0].pjm
    m.level = prj[0].level
    m.manager = prj[0].manager
    m.FY = fy
    var pf = null
    if (!isdev) {
      m.mdps = moment(j[i]['PlannedStart']).isValid()
        ? moment(j[i]['PlannedStart']).format('MM/DD/YYYY')
        : ''
      m.mdpf = moment(j[i]['PlannedFinish']).isValid()
        ? moment(j[i]['PlannedFinish']).format('MM/DD/YYYY')
        : ''
      m.mdas = moment(j[i]['ActualStart']).isValid()
        ? moment(j[i]['ActualStart']).format('MM/DD/YYYY')
        : ''
      m.mdaf = moment(j[i]['ActualFinish']).isValid()
        ? moment(j[i]['ActualFinish']).format('MM/DD/YYYY')
        : ''
    } else {
      m.mdps = j[i].mdps
      m.mdpf = j[i].mdpf
      m.mdas = j[i].mdas
      m.mdaf = j[i].mdaf
    }
    if (m.mdpf !== '') {
      pf = String(moment(m.mdpf).month() + 1)
      if (pf.length === 1) {
        pf = '0' + pf
      }
      m.month = pf
      m.planned = 1
    } else {
      m.month = 'No Month'
    }
    if (m.mdaf !== '') {
      m.complete = 1
      if (m.mdpf !== '') {
        var af = moment(m.mdaf)
        var pf = moment(m.mdpf)
        if (pf.isSameOrAfter(af)) {
          m.ontime = 1
        } else {
          // need root cause and category
          // TODO: get random values unless the milestone has actual data. Remove once testing is complete
          let cat = cats[getRandomInt(cats.length)]
          let b = causes.filter(cause => cause.cat === cat)  //p.filter(milestone => milestone.manager === this.ffManagers[i])
          let cause = b[getRandomInt(b.length)]['value']
          m.rcc = cat
          m.rc = cause
        }
      }
    }
    m.cd = isdev ? j[i].cd : j[i]['CustomerDeliverable']
    m.status = isdev ? j[i].status : j[i]['MilestoneStatus']
    p.push(m)

  }
  p = p.sort(predicateBy('FY'))
  return p
}
