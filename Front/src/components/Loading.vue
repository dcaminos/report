<template>
  <div class="loading">
    <img src="../assets/loading.gif">
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  text-align: center;
  padding-top: 100px;
}

.loading > img {
  width: 200px;
  height: 150px;
}
</style>
