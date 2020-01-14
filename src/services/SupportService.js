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
    getCauses() {
        if (isdev) {
            // when in dev mode use json-server against db.json which will be on localhost:3000
            return apiClient.get('/causes')
        }
        else {
            var allCauses = []
            function getPagedCauses(url) {
                if (url === null) {
                    url = _spPageContextInfo.webServerRelativeUrl + "/_api/lists/getbytitle('RootCauses')/items?";
                    url += "$select=ID,Title,Category";
                    url += "&$orderby=Category";
                }
                return axios
                    .get(url, {
                        headers: {
                            accept: 'application/json;odata=verbose'
                        }
                    })
                    .then(function (response) {
                        // concat the data to a temporary variable
                        allCauses = allCauses.concat(response.data.d.results)
                        // recursively load projects if there is a next result
                        if (response.data.d.__next) {
                            url = response.data.d.__next
                            return getPagedCauses(url)
                        } else {
                            //console.log(allCauses.length)
                            return allCauses
                        }
                    })
            }
            return getPagedCauses(null)
        }
    },
    getOrgs() {
        if (isdev) {
            // when in dev mode use json-server against db.json which will be on localhost:3000
            return apiClient.get('/branches')
        }
        else {
            var allOrgs = []
            function getPagedOrgs(url) {
                if (url === null) {
                    url = _spPageContextInfo.webServerRelativeUrl + "/_api/lists/getbytitle('Org Table')/items?";
                    url += "$select=ID,Title,Branch";
                    url += "&$orderby=Branch";
                }
                return axios
                    .get(url, {
                        headers: {
                            accept: 'application/json;odata=verbose'
                        }
                    })
                    .then(function (response) {
                        // concat the data to a temporary variable
                        allOrgs = allOrgs.concat(response.data.d.results)
                        // recursively load projects if there is a next result
                        if (response.data.d.__next) {
                            url = response.data.d.__next
                            return getPagedOrgs(url)
                        } else {
                            //console.log(allOrgs.length)
                            return allOrgs
                        }
                    })
            }
            return getPagedOrgs(null)
        }
    },
    getMilestones() {
        if (isdev) {
            // when in dev mode use json-server against db.json which will be on localhost:3000
            return apiClient.get('/sm')
        }
        else {
            var allMilestones = []
            function getPagedMilestones(url) {
                if (url === null) {
                    url = _spPageContextInfo.webServerRelativeUrl + "/_api/lists/getbytitle('StandardMilestones')/items?";
                    url += "$select=ID,Title,Dept,Phase,Acronym";
                    // url += "&$filter=(Dept eq '" + dept + "')"
                    url += "&$orderby=Phase";
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
                            //console.log(allMilestones.length)
                            return allMilestones
                        }
                    })
            }
            return getPagedMilestones(null)
        }
    }
}