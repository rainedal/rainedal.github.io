<template>
  <div class="hello">
    <navigation></navigation>
    <div ref="hello">
      <h1>{{ title }}</h1>
      <h2>is a Creative Technologist in Seattle, Washington</h2>
    </div>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import AnimationStore from '@/stores/AnimationStore'
  import MenuStore from '@/stores/MenuStore'
  import { EventBus } from '../event-bus'
  const animMap = require('../anim-map.json')

  import _ from 'lodash'
  import { TimelineMax, Expo } from 'gsap'

  export default {
    name: 'hello',
    data () {
      return {
        title: 'Raine Dalusong',
        menuState: MenuStore.state
      }
    },
    computed: {
      menuIsClosed () {
        return this.menuState.isClosed
      }
    },
    mounted () {
      this.events()
      this.ready()
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
    beforeDestroy () {
      this.unlistenElements()
    },
    methods: {
      events () {
        EventBus.$on('toggle-menu', this.toggleMenu)
        EventBus.$on('leave-page', this.leave)
      },
      unlistenElements () {
        EventBus.$off('toggle-menu', this.toggleMenu)
        EventBus.$off('leave-page', this.leave)
      },
      ready () {
        this.appearAnim = new TimelineMax({delay: 0.1})
        this.appearAnim.staggerFromTo(this.$refs.hello.children, 1.5, {y: 40, autoAlpha: 0}, {y: 0, autoAlpha: 1, ease: Expo.easeOut}, 0.1)
      },
      leave () {
        this.leaveAnim = new TimelineMax()
        this.leaveAnim.staggerTo(this.$refs.hello.children, 0.3, {y: 40, autoAlpha: 0, ease: Expo.easeIn, overwrite: 'all'}, '-0.08')
      },
      toggleMenu () {
        this.menuIsClosed ? this.ready() : this.leave()
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
    z-index: 1;
  }

  h2 {
    font-weight: 300;
    font-size: 1.75em;
    z-index: 1;
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
