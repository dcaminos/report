const URL = 'http://localhost:3000'

const getMachines = function () {
  return fetch(URL + '/machine_list')
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
}

const getMachine = function (machineName) {
  return fetch(URL + '/machine_data?name=' + machineName)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
}

export default {
  getMachines,
  getMachine
}
