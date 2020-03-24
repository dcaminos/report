<template>
  <div class="machine">
    <b-row>
      <b-col cols="6">
        <h5>States over the week</h5>
      </b-col>
      <b-col cols="6" class="colColors">
        <div><div class='box' v-bind:style="{ background: colorOff}"></div> Off</div>
        <div><div class='box' v-bind:style="{ background: colorUnloaded}"></div> Unloaded</div>
        <div><div class='box' v-bind:style="{ background: colorIdle}"></div> Idle</div>
        <div><div class='box' v-bind:style="{ background: colorLoaded}"></div> Loaded</div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ChartStatesTimeLine v-bind:machine="this.machine" v-bind:index="index"></ChartStatesTimeLine>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4">
        <ChartStatesPie v-bind:machine="this.machine" v-bind:index="index"></ChartStatesPie>
      </b-col>
      <b-col cols="8">
        <ChartStatesBar v-bind:machine="this.machine" v-bind:index="index"></ChartStatesBar>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ul>
          <li>The machine was <b>On</b> {{this.onTime}}</li>
          <li>The machine was <b>Off</b> {{this.offTime}}</li>
          <li>The machine did go to <b>idle</b> mode {{this.idleTimes}} times</li>
        </ul>
        </b-col>
                </b-row>
  </div>
</template>

<script>
import moment from 'moment'
import ChartStatesTimeLine from './charts/ChartStatesTimeLine'
import ChartStatesBar from './charts/ChartStatesBar'
import ChartStatesPie from './charts/ChartStatesPie'
import { MachineStates, getStateColor, getDurationText } from '../utils'

export default {
  name: 'machine',
  components: { ChartStatesTimeLine, ChartStatesBar, ChartStatesPie },
  data () {
    return {
      colorOff: getStateColor(MachineStates.OFF),
      colorUnloaded: getStateColor(MachineStates.UNLOADED),
      colorIdle: getStateColor(MachineStates.IDLE),
      colorLoaded: getStateColor(MachineStates.LOADED),
      onTime: getDurationText(moment.duration(this.machine.stateTimes[MachineStates.UNLOADED] + this.machine.stateTimes[MachineStates.IDLE] + this.machine.stateTimes[MachineStates.LOADED])),
      offTime: getDurationText(moment.duration(this.machine.stateTimes[MachineStates.OFF])),
      idleTimes: this.machine.changes.filter(change => change.state === MachineStates.IDLE).length
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.machine .row:not(:first-child) {
  margin-top: 25px;
}

.colColors {
  display: flex;
  flex-direction: row;
  font-size: 0.75em;
  font-weight: bolder;
  justify-content: flex-end;
}

.box {
  float: left;
  height: 15px;
  width: 15px;
  margin-right: 5px;
  margin-left: 20px;
  clear: both;
}
</style>
