<template>
  <div class="hello">
    <navigation></navigation>
    <h1>{{ title }}</h1>
    <h2>is a Creative Technologist in Seattle, Washington</h2>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import AnimationStore from '@/stores/AnimationStore'
  import MenuStore from '@/stores/MenuStore'
  import { EventBus } from '../event-bus'
  const animMap = require('../anim-map.json')

  import _ from 'lodash'
  import VirtualScroll from 'virtual-scroll'

  export default {
    name: 'hello',
    data () {
      return {
        title: 'Raine Dalusong'
      }
    },
    mounted () {
      this.vs = new VirtualScroll({
        el: this.$el
      })
      this.onceWheel = _.once(this.wheel)
      _.delay(this.events, 500)
    },
    beforeDestroy () {
      this.unlistenEvents()
    },
    beforeRouteLeave (to, from, next) {
      if (!MenuStore.state.isAnimated) {
        let delay = 800
        let targetedPage = to.name
        AnimationStore.setRouterInfo(from.name, targetedPage)
        EventBus.$emit('leave-page', {to: to, from: from})
        _.delay(next, delay)
      }
    },
    methods: {
      events () {
        this.vs.on(this.onceWheel)
      },
      unlistenEvents () {
        this.vs.destroy()
      },
      wheel () {
        this.$router.push('work')
      }
    },
    components: {
      Navigation
    }
  }
</script>

<style scoped>
  h1 {
    font-family: 'Oswald', sans-serif;
    font-size: 7em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 400;
    margin: 30px 0 30px 0;
  }

  h2 {
    font-weight: 300;
    font-size: 1.75em;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
