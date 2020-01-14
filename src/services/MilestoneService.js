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
  getMilestones() {
    //console.log('MilestoneService Getting all milestones')
    if (isdev) {
      // when in dev mode use json-server against db.json which will be on localhost:3000
      return apiClient.get('/milestones?_sort=erpid&_order=asc')
    } else {
      var allMilestones = []
      function getPagedMilestones(url) {
        if (url === null) {
          url =
            _spPageContextInfo.webServerRelativeUrl +
            "/_api/lists/getbytitle('MilestonesAndDeliverables')/items?"
          url += '$select=*'
          url += '&$orderby=ERPID'
        }
        return axios
          .get(url, {
            headers: {
              accept: 'application/json;odata=verbose'
            }
          })
          .then(function (response) {
            // concat the data to a temporary variable
            allMilestones = allMilestones.concat(response.data.d.results)
            // recursively load projects if there is a next result
            if (response.data.d.__next) {
              url = response.data.d.__next
              return getPagedMilestones(url)
            } else {
              //console.log("Found " + allMilestones.length + " milestones")
              return allMilestones
            }
          })
          .catch(function (error) {
            console.log('MilestoneService Error Getting Milestones: ' + error)
          })
      }
      return getPagedMilestones(null)
    }
  }
}
