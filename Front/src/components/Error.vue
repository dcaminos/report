<template>
  <div class="card bg-danger">
    <div class="card-header">
      <h3 class="card-title">Critical error</h3>
    </div>
    <div class="card-body">
      {{ message }}
    </div>
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
