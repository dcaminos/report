const config = require('./config.json')
const express = require('express')
const app = express()
const getMachineList = require('./GetMachineList')
const getMachineData = require('./GetMachineData')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Allow', 'GET')
  next()
})

app.get('/machine_list', getMachineList)
app.get('/machine_data', getMachineData)

app.listen(config.serverPort, function () {
  console.log('Example app listening on port', config.serverPort)
})
