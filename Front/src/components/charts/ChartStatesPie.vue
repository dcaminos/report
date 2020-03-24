<template>
    <Chart v-bind:data="this.data" v-bind:layout="this.layout" v-bind:config="this.config" v-bind:div-id="this.machine.name + '_states_pie_' + this.index" ></Chart>
</template>

<script>
import Chart from './Chart'
import { MachineStates, getStateColor } from '../../utils'
import moment from 'moment'

export default {
  name: 'ChartStatesPie',
  components: { Chart },
  data () {
    var data = [{
      labels: ['<b>Off</b>', '<b>Unloaded</b>', '<b>Idle</b>', '<b>Loaded</b>'],
      values: this.machine.stateTimes.map(value => {
        var duration = moment.duration(value, 'milliseconds')
        return duration.asDays()
      }),
      hole: 0.4,
      textinfo: 'label+percent',
      textposition: 'outside',
      marker: {
        colors: [getStateColor(MachineStates.OFF), getStateColor(MachineStates.UNLOADED), getStateColor(MachineStates.IDLE), getStateColor(MachineStates.LOADED)]
      },
      type: 'pie'
    }]

    const layout = {
      title: {
        text: 'Percentages',
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
      hovermode: false,
      showlegend: false,
      margin: { l: 35, r: 35, b: 35, t: 25, pad: 0 },
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
