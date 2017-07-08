<template lang="html">
  <div ref="menu" class="menu menu--light">
    <div class="menu-hit" @click="toggleClose"></div>
    <div class="menu-icon__container">
      <div ref="menuIcon" class="menu-icon">
        <div class="menu-line menu-line--big"></div>
        <div class="menu-line menu-line--big"></div>
        <div class="menu-line menu-line--big"></div>
      </div>
    </div>
    <div class="menu-links" ref="menuLinks">
      <nav-item
        v-for="navItem in navItems" :key="navItem.to"
        v-bind:title="navItem.title"
        v-bind:to="navItem.to">
      </nav-item>
    </div>
    <div class="menu-background" ref="menuBackground"></div>
  </div>
</template>

<script>
  import { TimelineMax, Expo, Power4 } from 'gsap'
  import _ from 'lodash'

  import { EventBus } from '../event-bus'
  import NavItem from '@/components/NavItem'

  import MenuStore from '@/stores/MenuStore'

  export default {
    name: 'navigation',
    data () {
      return {
        state: MenuStore.state,
        navItems: [
          {
            title: 'Home',
            to: 'home'
          },
          {
            title: 'Work',
            to: 'work'
          },
          {
            title: 'About',
            to: 'about'
          }
        ]
      }
    },
    computed: {
      isClosed () {
        return this.state.isClosed
      },
      isBlocked () {
        return this.state.isBlocked
      },
      menuIsNotAnimated () {
        return !this.state.isAnimated
      }
    },
    mounted () {
      let el = this.$el
      this.throttledOnResize = _.throttle(this.onResize, 300)

      this.$menuLines = this.$refs.menuIcon.children
      this.$menuLinks = this.$refs.menuLinks.children

      this.events()

      this.iconEnterAnim = new TimelineMax({paused: true})
      this.iconEnterAnim.from(this.$menuLines[0], 0.4, {scaleX: 0, ease: Power4.easeInOut}, '0.5')
      this.iconEnterAnim.from(this.$menuLines[2], 0.4, {scaleX: 0, ease: Power4.easeInOut}, '-=0.2')
      this.iconEnterAnim.from(this.$menuLines[1], 0.4, {scaleX: 0, ease: Power4.easeInOut}, '-=0.3')

      this.iconEnterAnim.play()

      this.openMenuTimeline = new TimelineMax({paused: true})

      this.openMenuTimeline
        .to(this.$menuLines[1], 0.3, {x: -10, autoAlpha: 0, ease: Expo.easeInOut})
        .to(this.$menuLines[0], 0.3, {rotation: 45, scaleX: 0.94, ease: Expo.easeInOut}, 0)
        .to(this.$menuLines[2], 0.3, {rotation: -45, scaleX: 0.94, ease: Expo.easeInOut}, 0)
        .set(this.$refs.menuLinks, {autoAlpha: 1}, 0)
        .to(this.$refs.menuBackground, 1, {autoAlpha: 1, ease: Expo.easeInOut}, 0)
        .staggerTo(this.$menuLinks, 1.5, {y: 0, autoAlpha: 1, ease: Expo.easeInOut, force3D: true}, 0.08, 0)
    },
    beforeDestroy () {
      this.unlistenEvents()
    },
    methods: {
      events () {
        window.addEventListener('resize', this.throttledOnResize)
        EventBus.$on('leave-page', this.leavePage)
        EventBus.$on('close-menu', this.closeMenu)
        EventBus.$on('click-current-link', this.closeMenu)
      },
      unlistenEvents () {
        window.removeEventListener('resize', this.throttledOnResize)
        EventBus.$off('click-current-link', this.closeMenu)
        EventBus.$off('leave-page', this.leavePage)
        EventBus.$off('close-menu', this.closeMenu)
      },
      onResize () {
        if (window.innerWidth < 960 && !this.isClosed) {
          this.closeMenu()
        }
      },
      toggleClose () {
        if (this.isClosed) {
          this.openMenu()
        } else if (!this.isClosed) {
          this.closeMenu()
        }
      },
      leavePage () {
        if (!this.isClosed) {
          MenuStore.closeMenu()
          this.openMenuTimeline.reverse()
        }
      },
      openMenu () {
        this.openMenuTimeline.play()
        MenuStore.openMenu()
        EventBus.$emit('toggle-menu', this.isClosed)
      },
      closeMenu () {
        this.openMenuTimeline.reverse()
        MenuStore.closeMenu()
        EventBus.$emit('toggle-menu', this.isClosed)
      }
    },
    components: {
      NavItem
    }
  }
</script>

<style lang="scss">
  .menu {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  }

  .menu-hit {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100px;
    height: 110px;
    cursor: pointer;
    z-index: 11;
  }

  .menu-icon__container {
    position: relative;
    float: right;
    width: 100px;
    height: 100px;
    z-index: 10;
  }

  .menu-icon {
    width: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .menu-line {
    width: 100%;
    height: 5px;
    background-color: #ffffff;
    margin-bottom: 11px;
    transform-origin: left;

    &:last-child {
      margin-bottom: 0px;
    }
  }

  .menu--light {
    color: #ffffff;
  }

  .menu-circle-hover {
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    opacity: 0;
    border-radius: 50%;
    transform-origin: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .menu-background {
    width: 100%;
    height: 100%;
    z-index: 9;
    position: absolute;
    visibility: hidden;
    opacity: 0;
    top: 0;
    left: 0;
    background-color: rgba(#011832, .9);
  }

  .menu-links {
    position: absolute;
    width: 100%;
    text-align: center;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    visibility: hidden;
  }
</style>
