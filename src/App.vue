<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Oswald:300,400,500|Source+Code+Pro:300,400');

  body {
    margin: 0;
  }

  #app {
    font-family: 'Source Code Pro', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /*color: #2c3e50;*/
    color: #ffffff;
    background-image: linear-gradient(-30deg, #FFCAD5 -10%, #AEE2FF 100%);
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline
  }
</style>
