<template>
  <div class="machine">
    <div class="header">
      <h3 class="name">{{this.name}}</h3>
      <div class="colColors">
        <div><div class='box green'></div> Loaded</div>
        <div><div class='box yellow'></div> Idle</div>
        <div><div class='box red'></div> Unloaded</div>
      </div>
    </div>
    <Chart v-bind:data="this.data" v-bind:layout="this.layout" v-bind:div-id="this.name + 'plot'" ></Chart>
  </div>
</template>

<script>
import Chart from './Chart'
import moment from 'moment'

export default {
  name: 'machine',
  components: { Chart },
  data () {
    const timeFrom = moment.utc(this.config.filters.timeFrom).format('YYYY-MM-DD HH:mm:ss.SSS')
    const timeTo = moment.utc(this.config.filters.timeTo).format('YYYY-MM-DD HH:mm:ss.SSS')

    const data = this.metrics.map(metric => {
      const x = []
      const y = []
      const text = []
      const hovertemplate = 'Metric: ' + metric.name + '<br>Value: %{y}<br>Time: %{x}<br>Status: %{text}<extra></extra>'

      metric.values.forEach(value => {
        const time = moment.utc(value.time).format('YYYY-MM-DD HH:mm:ss.SSS')
        x.push(time)
        y.push(value.value)
        if (value.value < this.config.filters.unloadedLimit) {
          text.push('Unloaded')
        } else if (value.value < this.config.filters.idleLimit) {
          text.push('Idle')
        } else {
          text.push('Loaded')
        }
      })

      return { x, y, text, hovertemplate, mode: 'markers', name: metric.name }
    })

    var layout = {
      xaxis: {
        range: [timeFrom, timeTo],
        type: 'date'
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
          y0: this.config.filters.minValue,
          y1: this.config.filters.unloadedLimit,
          fillcolor: '#FF0000',
          opacity: 0.2,
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
          y0: this.config.filters.unloadedLimit,
          y1: this.config.filters.idleLimit,
          fillcolor: '#FFFF00',
          opacity: 0.2,
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
          y0: this.config.filters.idleLimit,
          y1: this.config.filters.maxValue,
          fillcolor: '#008000',
          opacity: 0.2,
          line: {
            width: 0
          }
        }
      ]
    }

    return { data, layout }
  },
  props: {
    name: {
      type: String
    },
    metrics: {
      type: Array
    },
    config: {
      type: Object
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.machine {
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 40px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end
}

.name {
  margin: 0;
}

.colColors {
  display: flex;
  flex-direction: row;
  font-size: 0.75em;
}

.box {
  float: left;
  height: 15px;
  width: 15px;
  margin-right: 5px;
  margin-left: 20px;
  clear: both;
}

.green {
  background-color: #cce6cc;
}

.yellow {
  background-color: #ffffcc;
}

.red {
  background-color: #ffcccc;
}
</style>
