<template lang="html">
  <div ref="menu" class="menu menu--light">
    <div class="menu-hit" @click="toggleClose"></div>
    <div class="menu-icon__container">
      <div ref="menuIcon" class="menu-icon">
        <div class="menu-line menu-line--big"></div>
        <div class="menu-line menu-line--big"></div>
        <div class="menu-line menu-line--big"></div>
      </div>
      <span ref="menuCircleHover" class="menu-circle-hover"></span>
    </div>
    <div class="menu-links" ref="menuLinks">
      <nav-item
        v-for="navItem in navItems" :key="navItem.to"
        v-bind:title="navItem.title"
        v-bind:subtitle="navItem.subtitle"
        v-bind:to="navItem.to">
      </nav-item>
    </div>
    <div class="menu-background" ref="menuBackground"></div>
  </div>
</template>

<script>
  import { TimelineMax, Expo } from 'gsap'
  import _ from 'lodash'

  import { EventBus } from '../event-bus'
  import NavItem from '@/components/NavItem'

  import menuStore from '@/stores/MenuStore'
  import loaderStore from '@/stores/LoaderStore'

  export default {
    name: 'navigation',
    data () {
      return {
        state: menuStore.state,
        loaderState: loaderStore.state,
        navItems: [
          {
            title: 'Hello',
            to: 'hello'
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
      pageReady () {
        return this.loaderState.pageReady
      },
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
      this.pageReady

      this.openMenuTimeline = new TimelineMax({paused: true,
        onStart () {
          menuStore.menuIsAnimated()
        },
        onComplete () {
          menuStore.menuIsNotAnimated()
      }})

      this.openMenuTimeline
        .set(this.$refs.menuLinks, {autoAlpha: 1})
        .to(this.$menuLines, 0.5, {autoAlpha: 0, ease: Expo.easeInOut})
        .to(this.$refs.menuBackground, 1, {autoAlpha: 1, ease: Expo.easeOut}, 0)
        .staggerTo(this.$menuLinks, 1.5, {y: 0, autoAlpha: 1, ease: Expo.easeOut, force3D: true}, 0.08, 0)

      this.closeMenuTimeline = new TimelineMax({paused: true,
        onStart () {
          menuStore.menuIsAnimated()
        },
        onComplete () {
          menuStore.menuIsNotAnimated()
      }})

      this.closeMenuTimeline
        .to(this.$menuLines, 0.5, {autoAlpha: 1, ease: Expo.easeInOut})
        .to(this.$refs.menuBackground, 1, {autoAlpha: 0, ease: Expo.easeIn}, 0)
        .staggerTo(this.$menuLinks, 0.5, {y: 200, autoAlpha: 0, ease: Expo.easeIn}, -0.05, 0)
        .set(this.$refs.menuLinks, {autoAlpha: 0})
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
        EventBus.$off('leave-page', this.leavePage)
        EventBus.$off('close-menu', this.closeMenu)
        EventBus.$off('click-current-link', this.closeMenu)
      },
      onResize () {
        if (window.innerWidth < 960 && !this.isClosed) {
          this.closeMenu()
        }
      },
      toggleClose () {
        if (this.menuIsNotAnimated && !this.isBlocked) {
          if (this.isClosed) {
            this.openMenu()
          } else {
            this.closeMenu()
          }
        }
      },
      leavePage () {
        this.closeMenuTimeline.eventCallback('onComplete', () => {
          menuStore.menuIsNotAnimated()
        })

        if (!this.isClosed) {
          this.closeMenuTimeline.play(0)
          menuStore.closeMenu()
        }
      },
      openMenu () {
        this.openMenuTimeline.play(0)
        menuStore.openMenu()
        EventBus.$emit('toggle-menu', this.isClosed)
      },
      closeMenu () {
        this.closeMenuTimeline.play(0)
        menuStore.closeMenu()
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
    height: 1px;
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
