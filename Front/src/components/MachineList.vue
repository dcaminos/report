<template>
  <div class="card">
    <div class="card-header">
        <h3 class="card-title">Machines</h3>
    </div>
    <div class="card-body">
        <div role="tablist">
        <MachineItem
            v-for="(machineName, index) in machines"
            v-bind:machineName="machineName"
            v-bind:index="index"
            v-bind:key="machineName + index"
        ></MachineItem>
      </div>
    </div>
  </div>
</template>

<script>
import MachineItem from './MachineItem'

export default {
  name: 'report',
  components: { MachineItem },
  props: {
    machines: {
      type: Array
    }
  }
}
</script>
