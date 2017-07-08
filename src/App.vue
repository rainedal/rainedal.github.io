<template>
  <div class="app">
    <on-mobile></on-mobile>
    <router-view></router-view>
  </div>
</template>

<script>
  import OnMobile from '@/components/OnMobile'
  export default {
    name: 'app',
    components: {
      OnMobile
    }
  }
</script>

<style lang="scss" src="./styles/app.scss"></style>
