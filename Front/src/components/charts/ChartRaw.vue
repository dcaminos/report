<template>
    <Chart v-bind:data="this.data" v-bind:layout="this.layout" v-bind:div-id="machine.name + '_raw_chart_' + index" ></Chart>
</template>

<script>
import Chart from './Chart'
import moment from 'moment'

export default {
  name: 'ChartRaw',
  components: { Chart },
  data () {
    const timeFrom = moment.utc(this.machine.filters.timeFrom).format('YYYY-MM-DD HH:mm:ss.SSS')
    const timeTo = moment.utc(this.machine.filters.timeTo).format('YYYY-MM-DD HH:mm:ss.SSS')

    const x = []
    const y = []
    const text = []
    const hovertemplate = 'Metric: ' + this.machine.metric + '<br>Value: %{y}<br>Time: %{x}<br>Status: %{text}<extra></extra>'

    this.machine.values.forEach(value => {
      const time = moment.utc(value.time).format('YYYY-MM-DD HH:mm:ss.SSS')
      x.push(time)
      y.push(value.value)
      if (value.value < this.machine.filters.unloadedLimit) {
        text.push('Unloaded')
      } else if (value.value < this.machine.filters.idleLimit) {
        text.push('Idle')
      } else {
        text.push('Loaded')
      }
    })
    const data = [{ x, y, text, hovertemplate, mode: 'markers', name: this.machine.metric, line: { color: '#000000'} }]
    const layout = {
      xaxis: {
        range: [timeFrom, timeTo],
        type: 'date'
      },
      yaxis: {
        showgrid: false,
        fixedrange: true
      },
      height: 300,
      margin: { l: 35, r: 35, b: 35, t: 25, pad: 0 },
      shapes: [
        {
          layer: 'below',
          type: 'rect',
          xref: 'x',
          yref: 'y',
          x0: timeFrom,
          x1: timeTo,
          y0: this.machine.filters.minValue,
          y1: this.machine.filters.unloadedLimit,
          fillcolor: '#f56854',
          line: {
            width: 0
          }
        },
        {
          layer: 'below',
          type: 'rect',
          xref: 'x',
          yref: 'y',
          x0: timeFrom,
          x1: timeTo,
          y0: this.machine.filters.unloadedLimit,
          y1: this.machine.filters.idleLimit,
          fillcolor: '#f39c12',
          line: {
            width: 0
          }
        },
        {
          layer: 'below',
          type: 'rect',
          xref: 'x',
          yref: 'y',
          x0: timeFrom,
          x1: timeTo,
          y0: this.machine.filters.idleLimit,
          y1: this.machine.filters.maxValue,
          fillcolor: '#02a65a',
          line: {
            width: 0
          }
        }
      ]
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
