<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route() {
      document.title = this.$route.meta.title
    }
  }
}
</script>
