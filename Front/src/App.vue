<template>
  <div id="app">
    <Loading v-if="this.loading" />
    <Error v-if="this.error != null" v-bind:message="this.error" />
    <Report v-else-if="this.data != null" v-bind:data="this.data" />
  </div>
</template>

<script>
import Loading from './components/Loading'
import Error from './components/Error'
import Report from './components/Report'

export default {
  name: 'App',
  components: {
    Loading,
    Error,
    Report
  },
  data () {
    return {
      loading: true,
      error: null,
      data: null
    }
  },
  methods: {
    getData: function () {
      this.loading = true
      this.error = null
      fetch('http://localhost:3000')
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          this.data = json
          this.loading = false
        })
        .catch(error => {
          this.error = error.message
          this.loading = false
        })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
