<template lang="html">
  <div class="case-study-nav" @mouseover="mouseover" @mouseout="mouseout">
    <a class="case-study__link" :to="to" ref="link" @click.prevent="onClick">
      <span class="case-study__title" ref="title">
        {{ title }}
        <div class="case-study__hover" ref="hoverLine"></div>
      </span>
    </a>
  </div>
</template>

<script>
  import { TimelineMax, Expo } from 'gsap'
  import { EventBus } from '../event-bus'
  import menuStore from '@/stores/MenuStore'

  export default {
    props: [
      'to', 'title'
    ],
    data () {
      return {
        state: menuStore.state
      }
    },
    mounted () {
      this.mouseOverAnim = new TimelineMax({paused: true})
      this.mouseOverAnim.to(this.$refs.hoverLine, 0.5, {autoAlpha: 1, scaleX: 1, ease: Expo.easeOut})
    },
    methods: {
      onClick () {
        this.$router.push({name: this.to})
      },
      mouseover () {
        this.mouseOverAnim.play()
      },
      mouseout () {
        this.mouseOverAnim.reverse()
      }
    }
  }
</script>

<style lang="scss">
  .case-study__link {
    text-decoration: none;
    user-select: none;
    cursor: pointer;
  }

  .case-study__title {
    font-size: 112px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-family: 'Oswald', sans-serif;
    position: relative;
  }

  .case-study__hover {
		width: 90%;
		height: 5px;
		opacity: 0;
		position: absolute;
    left: 5%;
		top: 100%;
    background-color: #ffffff;
    transform: translate3d(0px, -50%, 0px) scaleX(0);
    transform-origin: center;
  }	
</style>
