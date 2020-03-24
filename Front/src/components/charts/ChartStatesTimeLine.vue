<template>
    <Chart v-bind:data="this.data" v-bind:layout="this.layout" v-bind:div-id="this.machine.name + '_states_time_line_' + this.index" ></Chart>
</template>

<script>
import Chart from './Chart'
import { getStateColor } from '../../utils'
import moment from 'moment'

const createLine = (previousChange, nextChange) => {
  const lineFrom = moment.utc(previousChange.time).format('YYYY-MM-DD HH:mm:ss.SSS')
  const lineTo = moment.utc(nextChange.time).format('YYYY-MM-DD HH:mm:ss.SSS')
  let line = null

  line = {
    x: [lineFrom, lineTo],
    y: [1, 1],
    mode: 'lines',
    text: [ moment.utc(previousChange.time).format('MMM Do YYYY HH:mm:ss') ],
    hovertemplate: '%{text}<extra></extra>',
    name: previousChange.state,
    line: {
      color: getStateColor(previousChange.state),
      width: 30
    }
  }
  return line
}

export default {
  name: 'ChartStatesTimeLine',
  components: { Chart },
  data () {
    const timeFrom = moment.utc(this.machine.filters.timeFrom).format('YYYY-MM-DD HH:mm:ss.SSS')
    const timeTo = moment.utc(this.machine.filters.timeTo).format('YYYY-MM-DD HH:mm:ss.SSS')

    let previousChange = null
    const data = this.machine.changes.map((change, index) => {
      let line = null
      if (index > 0) {
        line = createLine(previousChange, change)
      }
      previousChange = change
      return line
    }).filter(item => item !== null)
    data.push(createLine(previousChange, { time: this.machine.filters.timeTo }))

    const layout = {
      title: {
        text: 'Timeline',
        xref: 'paper',
        x: 0
      },
      hovermode: 'closest',
      showlegend: false,
      xaxis: {
        range: [timeFrom, timeTo],
        type: 'date',
        showgrid: false
      },
      yaxis: {
        showticklabels: false,
        showgrid: false,
        fixedrange: true
      },
      height: 100,
      margin: { l: 35, r: 35, b: 35, t: 25, pad: 0 }
    }

    return { data, layout }
  },
  props: {
    machine: {
      type: Object
    },
    index: {
      type: Number
    }
  }
}
</script>
