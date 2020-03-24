# Welcome to Machines Report :wave:
**A test for https://safianalytics.com/ .**

## Configuration
- Clone the repository
- Drop the CSV file into the 'Back' folder
- Configure the 'Back/config.json' file ()

## Config.json values
| Property | Description | Default |
| :---: | :---: | :---: |
| serverPort | HTTP server port | 3000 |
| filters.timeFrom | Start date to render | 1534723200000 (Monday, 20 August 2018 0:00:00.000) |
| filters.timeTo | End date to render | 1535327999999 (Sunday, 26 August 2018 23:59:59.999) |
| filters.minValue | min value to render | -5 |
| filters.unloadedLimit | max value to declare the machine status as unloaded | 1 |
| filters.idleLimit | max value to declare the machine status as idle | 20 |
| timeOffline | Limit of time to consider the machine like offline | 120000 (2 min) |
| deltaTime | Seconds after last input to set the start of Offline state | 30000 (30 sec) |
| metric | The metric name to render| "Psum_kW |
| dataFile | Name of the CSV file | demoCompressorWeekData.csv |
| dataHeaders | Name of the columns inside CSV file | ["timestamp", "metricid", "deviceid", "recvalue", "calcvalue", "excthreshold" , "excthlimit", "deviation"] |
| fileds.machine | name of the machine column inside the CSV file  | deviceid |
| fileds.metric | name of the metric column inside the CSV file  | metricid |
| fileds.time | name of the time column inside the CSV file  | timestamp |
| fileds.value | name of the value column inside the CSV file  | recvalue |

## Backend installation

```bash
cd Back
yarn
yarn start
```

## Frontend installation

```bash
cd Front
yarn
yarn start
```

## Frontend tests

```bash
cd Front
yarn test
```

## Notes

- If you change the serverPort value, make sure to update the App.vue file in the Frontend
- In a future implementation, minValue and maxValue can be calculated in real time
- In a future implementation, unloadedLimit and idleLimit can be a percentage based on min and max values.
- Each fileds.* value must exist in the dataHeaders array.