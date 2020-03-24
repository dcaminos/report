<template>
  <div class="chart">
    <div v-bind:id='divId' :class='{ resizePlot: resize }'></div>
  </div>
</template>

<script>
import $ from 'jquery'
var Plotly = require('plotly.js/lib/core')
Plotly.register(require('plotly.js/lib/bar'))
Plotly.register(require('plotly.js/lib/pie'))

export default {
  name: 'chart',
  props: {
    data: {
      type: Array
    },
    layout: {
      type: Object
    },
    config: {
      type: Object
    },
    divId: {
      type: String,
      required: true
    },
    resize: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.Plot()
    this.$watch('data', this.Plot, { deep: true })
    $(window).bind('resize', this.onResize)
  },
  methods: {
    Plot () {
      return Plotly.newPlot(this.divId, this.data, this.layout, this.config)
    },
    onResize () {
      if (this.resize) {
        var d3 = Plotly.d3
        var gd3 = d3.select('#' + this.divId)
        gd3.style({
          width: '100%',
          height: '100%'
        })
        Plotly.Plots.resize(gd3[0][0])
      }
    }
  }
}
</script>
