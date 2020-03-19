<template>
  <div class="error">
    <h1>Critical error</h1>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: 'error',
  props: {
    message: {
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

h1, h2 {
  font-weight: normal;
  color: #ff0000;
}
</style>
