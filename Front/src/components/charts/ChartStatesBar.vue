<template>
    <Chart v-bind:data="this.data" v-bind:layout="this.layout" v-bind:config="this.config" v-bind:div-id="this.machine.name + '_states_bar_' + this.index" ></Chart>
</template>

<script>
import moment from 'moment'
import Chart from './Chart'
import { getStateName, getStateColor, getDurationText } from '../../utils'

export default {
  name: 'ChartStatesBar',
  components: { Chart },
  data () {
    const data = []
    for (let i = 0; i < 4; i++) {
      const duration = moment.duration(this.machine.stateTimes[i])
      data.push({
        x: [''],
        y: [duration.asDays()],
        name: '<b>' + getStateName(i) + ':</b> ' + getDurationText(duration),
        marker: {
          color: [getStateColor(i)]
        },
        type: 'bar'
      })
    }

    const layout = {
      title: {
        text: 'Accumulated time',
        xref: 'paper',
        x: 0,
        y: 1
      },
      xaxis: {
        showgrid: false,
        fixedrange: true
      },
      yaxis: {
        fixedrange: true
      },
      legend: {
        x: 1,
        y: 0
      },
      hovermode: false,
      showlegend: true,
      margin: { l: 35, r: 300, b: 8, t: 25, pad: 0 },
      height: 200
    }

    const config = {
      displayModeBar: false
    }

    return { data, layout, config }
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
