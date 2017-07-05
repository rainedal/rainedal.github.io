<template lang="html">
  <div class="work">
    <navigation></navigation>
    <div class="section-title">Work</div>
    <div class="case-studies" ref="cases">
      <case-study
        v-for="caseStudy in caseStudies" :key="caseStudy.to"
        v-bind:title="caseStudy.title"
        v-bind:subtitle="caseStudy.subtitle"
        v-bind:to="caseStudy.to">
      </case-study>
    </div>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import CaseStudy from '@/components/CaseStudy'

  import AnimationStore from '@/stores/AnimationStore'
  import MenuStore from '@/stores/MenuStore'
  import { EventBus } from '../event-bus'
  import { TimelineMax, Expo } from 'gsap'
  import _ from 'lodash'

  export default {
    name: 'work',
    data () {
      return {
        menuState: MenuStore.state,
        isAppeared: false,
        caseStudies: [
          {
            title: 'Grasshopper',
            to: 'grasshopper'
          },
          {
            title: 'Up Close & Tasty',
            to: 'ucat'
          },
          {
            title: 'Champs Sports',
            to: 'champs'
          },
          {
            title: 'Pepsi Max',
            to: 'pepsi'
          },
          {
            title: 'Vidgeo',
            to: 'vidgeo'
          }
        ]
      }
    },
    computed: {
      menuIsClosed () {
        return this.menuState.isClosed
      }
    },
    mounted () {
      this.events()
      this.loaderReady()
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
      this.unlistenEvents()
    },
    methods: {
      events () {
        EventBus.$on('leave-page', this.leave)
        EventBus.$on('toggle-menu', this.toggleMenu)
      },
      unlistenEvents () {
        EventBus.$off('leave-page', this.leave)
        EventBus.$off('toggle-menu', this.toggleMenu)
      },
      loaderReady () {
        this.appear()
        this.isAppeared = true
      },
      appear () {
        let tl = new TimelineMax({delay: 0.3})
        tl.staggerFromTo(this.$refs.cases.children, 1.5, {y: 40, autoAlpha:0}, {y: 0, autoAlpha: 1, ease: Expo.easeOut}, 0.1)
      },
      leave () {
        let tl = new TimelineMax()
        tl.staggerTo(this.$refs.cases.children, 0.3, {y: 40, autoAlpha: 0, ease: Expo.easeIn, overwrite: 'all'}, '-0.08')
      },
      toggleMenu () {
        this.menuIsClosed ? this.appear() : this.leave()
      }
    },
    components: {
      Navigation,
      CaseStudy
    }
  }
</script>

<style>
  .section-title {
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 4em;
    transform: rotate(-90deg);
    position: absolute;
    top: 100px;
    left: -30px;
    user-select: none;
  }
</style>
