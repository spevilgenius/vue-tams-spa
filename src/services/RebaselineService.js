/* eslint-disable */
import axios from 'axios'

let location = String(window.location)
let isdev = false
let baseUrl = ''
let globalUrl = ''

if (location.indexOf('localhost') >= 0) {
  baseUrl = 'http://localhost:3000'
  isdev = true
} else {
  baseUrl = _spPageContextInfo.webServerRelativeUrl
}
// used for dev purposes with json-server
const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json; odata=verbose'
  }
})

export default {
  getRebaselines() {
    //console.log('RebaselineService Getting all milestones')
    if (isdev) {
      // when in dev mode use json-server against db.json which will be on localhost:3000
      return apiClient.get('/rebaselines?_sort=ERPDR&_order=asc')
    } else {
      var allRebaselines = []
      function getPagedRebaselines(url) {
        if (url === null) {
          url = _spPageContextInfo.webServerRelativeUrl + "/_api/lists/getbytitle('VMRebaselineData')/items?"
          url += '$select=Id,Title,RebaselineDate,ProjectManager/Title,PjMCode/Title,PjMCode/Div,PjMCode/Branch,ERPDR/Title,ERPDR/ProjectTitle'
          url += ',NewRebaselineRootCauseCat/Title,NewRebaselineRootCause/Title'
          url += '&$expand=ProjectManager,PjMCode,ERPDR,NewRebaselineRootCauseCat,NewRebaselineRootCause'
          //url += '&$orderby=ERPDR'
        }
        return axios
          .get(url, {
            headers: {
              accept: 'application/json;odata=verbose'
            }
          })
          .then(function (response) {
            // concat the data to a temporary variable
            allRebaselines = allRebaselines.concat(response.data.d.results)
            // recursively load projects if there is a next result
            if (response.data.d.__next) {
              url = response.data.d.__next
              return getPagedRebaselines(url)
            } else {
              //console.log("Found " + allRebaselines.length + " milestones")
              return allRebaselines
            }
          })
          .catch(function (error) {
            console.log('RebaselineService Error Getting Rebaselines: ' + error)
          })
      }
      return getPagedRebaselines(null)
    }
  }
}
