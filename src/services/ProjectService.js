/* eslint-disable */
import axios from 'axios'

let location = String(window.location)
let isdev = false
let baseUrl = ''

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
  getProjects() {
    // in SharePoint the base call for Projects
    if (isdev) {
      // when in dev mode use json-server against db.json which will be on localhost:3000
      return apiClient.get('/projects')
    } else {
      var allProjects = []
      function getPagedProjects(url) {
        // TODO: Filter for active and order by manager PM/Title
        if (url === null) {
          url =
            _spPageContextInfo.webServerRelativeUrl +
            "/_api/lists/getbytitle('ProjectExecutionMain')/items?$select=Id,Title,ProjectTitle,DeptText,PlannedStart,ActualStart"
          url +=
            ',PlannedFinish,ActualFinish,Status,WorkOrderID,ProjectStatusText,ProjectLevelShort,PPIDLink,VarianceLink,SpendPlansLink,CustomerRDD,ProjectLevelShort'
          url +=
            ',PPID/Title,PM/Title,PjMCode/Title,PjMCode/Branch,PjMCode/Div,DeliverableMilestonesEditRecord/Title,ERPResourceSponsor/Title'
          url += '&$expand=PPID,PM,PjMCode,DeliverableMilestonesEditRecord,ERPResourceSponsor' // DeliverableMilestonesEditRecord is Y if there are milestones
          //url += "&$filter=(Status eq 'Active') or (Status eq 'Awaiting Funding')"
        }
        return axios
          .get(url, {
            headers: {
              accept: 'application/json;odata=verbose'
            }
          })
          .then(function(response) {
            // concat the data to a temporary variable
            allProjects = allProjects.concat(response.data.d.results)
            // recursively load projects if there is a next result
            if (response.data.d.__next) {
              url = response.data.d.__next
              return getPagedProjects(url)
            } else {
              console.log(allProjects.length)
              return allProjects
            }
          })
      }
      return getPagedProjects(null)
    }
  }
}
