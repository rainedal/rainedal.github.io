<template lang="html">
  <div class="about-content" ref="aboutContent">
    <div class="about-content__title" v-html="title"></div>
    <div class="about-content__content-container" ref="contentContainer">
      <div class="about-content__content" v-html="content"></div>
      <div class="about-content__social">
        <div class="about-content__social-title">{{ socialTitle }}</div>
        <div class="about-content__networks" ref="network">
          <div class="about-content__network" v-for="network in networks">
            <a class="about-content__network__link" :href="network.link" target="_blank">{{ network.name }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { TimelineMax, Expo } from 'gsap'
  import { EventBus } from '../event-bus'
  import MenuStore from '@/stores/MenuStore'
  import LoaderStore from '@/stores/LoaderStore'
  const aboutText = require('./about.json').about

  export default {
    name: 'about-content',
    data () {
      return {
        title: aboutText.title,
        content: aboutText.content,
        socialTitle: aboutText.socialTitle,
        networks: aboutText.socialNetworks,
        menuState: MenuStore.state,
        loaderState: LoaderStore.state,
        isAppeared: false
      }
    },
    computed: {
      pageReady () {
        return this.loaderState.pageReady
      },
      menuIsClosed () {
        return this.menuState.isClosed
      }
    },
    mounted () {
      this.$bigTitle = this.$el.querySelectorAll('.about-content__big-title')
      this.events()
      this.loaderReady()
    },
    beforeDestroy () {
      this.unlistenEvents()
    },
    methods: {
      events () {
        EventBus.$on('leave-page', this.leave)
        EventBus.$on('toggle-menu', this.toggleMenu)
        EventBus.$on('page-ready', this.loaderReady)
      },
      unlistenEvents () {
        EventBus.$off('leave-page', this.leave)
        EventBus.$off('toggle-menu', this.toggleMenu)
        EventBus.$off('page-ready', this.loaderReady)
      },
      loaderReady () {
        if (this.pageReady && !this.isAppeared) {
          this.appear()
          this.isAppeared = true
        }
      },
      appear () {
        let tl = new TimelineMax({delay: 0.3})
        tl.staggerFromTo(this.$refs.aboutContent.children, 1.5, {y: 40, autoAlpha: 0}, {y: 0, autoAlpha: 1, ease: Expo.easeOut}, 0.1)
        tl.fromTo(this.$refs.network, 1.5, {y: 30, autoAlpha: 0}, {y: 0, autoAlpha: 1, ease: Expo.easeOut}, '-=1.3')
      },
      leave () {
        let tl = new TimelineMax()
        tl.staggerTo(this.$refs.aboutContent.children, 0.3, {y: 40, autoAlpha: 0, ease: Expo.easeIn, overwrite: 'all'}, -0.08)
      },
      toggleMenu () {
        this.menuIsClosed ? this.appear() : this.leave()
      }
    }
  }
</script>

<style lang="scss">
  $about-blue: #828ED4;

  .about-content {
    margin: auto;
    font-size: 2em;
    text-align: center;
    color: #ffffff;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .about-content__title {
    text-align: left;
    letter-spacing: .12em;
  }

  .about-content__big-title {
    font-size: 3em;
    text-transform: uppercase;
    font-family: 'Oswald', sans-serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: .12em;
    display: inline-block;
    vertical-align: middle;
    margin: 0px 5px;

    background-color: #425661;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .about-content__content {
    line-height: 1.8em;
    font-size: 2em;
    margin: 2.5em 0em;
  }

  .about-content__content-container {
    margin: 0em auto;
    font-size: 12px;
    max-width: 65em;
    text-align: left;
  }

  .about-content__link {
    font-style: bold;
    text-decoration: none;
    color: $about-blue;
    transition: color .4s ease;

    &:hover {
      color: lighten($about-blue, 12);
    }

  }

  .about-content__social-title {
    font-size: 1.5em;
    margin-bottom: .6em;
    letter-spacing: .1em;
    color: $about-blue;
  }

  .about-content__network {
    display: inline-block;
    &:after {
      content: '-';
      color: $about-blue;
      margin: 0em .5em;
    }

    &:last-child {
      &:after {
        display: none;
        content: '';
      }
    }
  }

  .about-content__network__link {
    text-decoration: none;
    display: inline-block;
    vertical-align: middle;
    color: $about-blue;
    text-transform: uppercase;
    letter-spacing: .1em;
    font-size: 3em;
    line-height: 1.5em;
    transition: all .4s ease;

    &:hover {
      color: lighten($about-blue, 12);
    }
  }
</style>
