<template>
  <div >
    <div class="wrapper">
      <div class="content-wrapper">
        <Report/>
      </div>
    </div>
  </div>
</template>

<script>
import Report from './components/Report'

export default {
  name: 'App',
  components: {
    Report
  }
}
</script>

<style>
  @import 'bootstrap';
  @import 'bootstrap-vue';
  @import './assets/styles/adminlte.css';

  .wrapper .content-wrapper {
    min-height: 100vh;
  }
</style>
