<template lang="html">
  <div class="work">
    <navigation></navigation>
    <div class="section-title">Work</div>
    <div class="case-studies">
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
  import _ from 'lodash'

  export default {
    name: 'work',
    data () {
      return {
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
    beforeRouteLeave (to, from, next) {
      if (!MenuStore.state.isAnimated) {
        let delay = 800
        let targetedPage = to.name
        AnimationStore.setRouterInfo(from.name, targetedPage)
        EventBus.$emit('leave-page', {to: to, from: from})
        _.delay(next, delay)
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
