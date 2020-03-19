<template>
  <div class="report">
    <div class="header">
      <h1>Machines report</h1>
      <div class="info">
        <div>Source:</div>
        <div>{{data.config.dataFile}}</div>
        <div class="withMargin">From:</div>
        <div>{{this.timeFrom}}</div>
        <div>Last Update:</div>
        <div>{{this.updated}}</div>
        <div class="withMargin">To:</div>
        <div>{{this.timeTo}}</div>
      </div>
    </div>
    <Machine
      v-for="machine in data.machines"
      v-bind:key="machine.name"
      v-bind:name="machine.name"
      v-bind:metrics="machine.metrics"
      v-bind:config="data.config"
    ></Machine>
  </div>
</template>

<script>
import Machine from './Machine'
import moment from 'moment'

export default {
  name: 'report',
  components: { Machine },
  data () {
    return {
      timeFrom: moment.utc(this.data.config.filters.timeFrom).format('YYYY-MM-DD HH:mm:ss.SSS'),
      timeTo: moment.utc(this.data.config.filters.timeTo).format('YYYY-MM-DD HH:mm:ss.SSS'),
      updated: moment.utc(this.data.updated).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.report {
  display: flex;
  flex-direction: column;
  margin: 8px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.info {
  display: grid;
  grid-template-columns: repeat(4, auto);
  font-size: 0.75em;
  font-weight: bold;
  height: 34px;
  margin-top: 25px;
}

.info > div {
  margin-left: 10px;
}

.info > .withMargin {
  margin-left: 30px;
}

h1 {
  font-weight: normal;
}
</style>
