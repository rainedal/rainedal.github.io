<template lang="html">
  <div class="page-about">
    <div class="overlay" ref="overlay"></div>
    <navigation></navigation>
    <div class="section-title">About</div>
    <about-content></about-content>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import AboutContent from '@/components/AboutContent'

  import AnimationStore from '@/stores/AnimationStore'
  import MenuStore from '@/stores/MenuStore'
  import { EventBus } from '../event-bus'
  import { TimelineMax, Expo } from 'gsap'
  import _ from 'lodash'

  export default {
    beforeRouteLeave (to, from, next) {
      if (!MenuStore.state.isAnimated) {
        let delay = 800
        let targetedPage = to.name
        AnimationStore.setRouterInfo(from.name, targetedPage)
        EventBus.$emit('leave-page', {to: to, from: from})
        _.delay(next, delay)
      }
    },
    mounted () {
        let overlayTl = new TimelineMax({delay: 0})
        overlayTl.to(this.$refs.overlay, 0.5, {autoAlpha: 0, ease: Expo.easeOut})
    },
    components: {
      Navigation,
      AboutContent
    }
  }
</script>

<style lang="scss">
  .page-about {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .section-title {
    font-family: 'Oswald', sans-serif;
    font-size: 4em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transform: rotate(-90deg);
    position: absolute;
    top: 100px;
    left: -30px;
  }
</style>
