<template>
  <b-card no-body class="card-primary">
      <b-card-header header-tag="header" class="card-header" role="tab"  href="#" v-b-toggle="'accordion-' + index" v-on:click="select()" >
        <h4 class="card-title">{{machineName}}</h4>
      </b-card-header>
      <b-collapse v-bind:id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div v-if="this.loading" class="loading">
            <img src="../assets/loading.gif">
          </div>
          <div v-else>
            <Error v-if="this.error !== null"  v-bind:message="this.error"/>
            <Machine v-else-if="this.machine !== null" v-bind:machine="machine" v-bind:index="index"/>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
</template>

<script>
import Api from '../Api'
import Error from './Error'
import Machine from './Machine'

export default {
  name: 'MachineItem',
  components: {
    Error,
    Machine
  },
  data () {
    return {
      machine: null,
      error: null,
      loading: false
    }
  },
  methods: {
    select: function () {
      if (this.machine === null && this.loading === false) {
        this.loading = true
        Api.getMachine(this.machineName)
          .then((json) => {
            this.machine = json
            this.error = null
            this.loading = false
          })
          .catch(error => {
            this.machine = null
            this.error = error.message
            this.loading = false
          })
      }
    }
  },
  props: {
    index: {
      type: Number
    },
    machineName: {
      type: String
    }
  }
}
</script>

<style scoped>
.card-header {
  cursor: pointer;
}

.loading {
  text-align: center;
  height: 495px;
}

</style>
