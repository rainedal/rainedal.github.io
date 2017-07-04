<template lang="html">
  <div class="menu-link" @mouseover="mouseover" @mouseout="mouseout">
    <a class="menu-link__link" :to="to" ref="link" @click.prevent="onClick">
      <div class="menu-link__title" ref="title">
        {{ title }}
        <div class="menu-link__hover" ref="hoverLine"></div>
      </div>
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
    computed: {
      menuIsClosed () {
        return this.state.isClosed
      },
      menuIsAnimated () {
        return this.state.isAnimated
      },
      isCurrentRoute () {
        let isCurrentRoute = this.$route.name === this.to ? true : false
        return isCurrentRoute
      }
    },
    mounted () {
      this.hoverAnim = new TimelineMax({paused: true})
      this.hoverAnim.to(this.$refs.hoverLine, 0.6, {x: '-50%', scaleX: 1, autoAlpha: 1, ease:Expo.easeOut})
    },
    methods: {
      mouseover () {
        this.hoverAnim.play()
      },
      mouseout () {
        this.hoverAnim.reverse()
      },
      onClick () {
        if (!this.menuIsAnimated) {
          if (this.isCurrentRoute) {
            return EventBus.$emit('click-current-link')
          } else if (!this.menuIsAnimated) {
            this.$router.push({name: this.to})
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .menu-link__link {
    text-decoration: none;
  }

  .menu-link {
    user-select: none;
    visibility: hidden;
    cursor: pointer;
    margin-bottom: 60px;
    transform: translateY(200px);
    &:last-child {
      margin-bottom: 0px;
    }
  }

  .menu-link__hover {
    width: 250px;
    z-index: -1;
    height: 5px;
    opacity: 0;
    position: absolute;
    margin-left: 50%;
    top: 95%;
    background-image: linear-gradient(-30deg, #FFCAD5 -10%, #AEE2FF 100%);
    transform: translate3d(-50%, -50%, 0px) scaleX(0);
    transform-origin: center;
  }

  .menu-link__title {
    font-size: 112px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-family: 'Oswald', sans-serif;
    display: block;
    position: relative;
  }
</style>
