/* eslint-disable */
import axios from 'axios'
let baseUrl = 'https://ansolinc.sharepoint.com/sites/dev_tams' //_spPageContextInfo.webServerRelativeUrl

export default {
  getHulls() {
    let url = baseUrl + "/_api/web/lists/getbytitle('Platforms')/items?"
    url += "$select=Title,SortCode,Name,ClassName,Fleet"
    url += "&$orderby=Name"

    return axios
      .get(url, {
        headers: {
          accept: 'application/json;odata=verbose'
        }
      })
      .then(function(response) {
        let results = response.data.d.results
        return results
      })
      .catch(function(error) {
        console.log('HullsService Error Getting Results: ' + error)
      })
  }
}