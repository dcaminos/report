<template>
  <div class="report">
    <div v-if="this.loading" class="loading">
      <img src="../assets/loading.gif">
    </div>
    <div v-else>
      <div class="content-header">
        <div class="container">
          <div class="row mb-2">
            <div class="col-sm-12">
              <h1 class="m-0 text-dark">Safian Alytics</h1>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <div class="content">
        <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <Error v-if="this.error !== null"  v-bind:message="this.error"/>
                  <MachineList v-else v-bind:machines="this.machines"/>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../Api'
import Error from './Error'
import MachineList from './MachineList'

export default {
  name: 'report',
  components: {
    Error,
    MachineList
  },
  data () {
    return {
      loading: true,
      error: null,
      machines: []
    }
  },
  methods: {
    getMachines: function () {
      this.loading = true
      Api.getMachines()
        .then((json) => {
          // this.machines = json
          this.machines = [json[0], json[0], json[0], json[0], json[0]] // only for test
          this.error = null
          this.loading = false
        })
        .catch(error => {
          this.machines = []
          this.error = error.message
          this.loading = false
        })
    }
  },
  created () {
    this.getMachines()
  }
}
</script>

<style scoped>
.loading {
  text-align: center;
  padding-top: 100px;
}
</style>
