<template lang="html">
  <div class="case-study-gh">
    <navigation></navigation>
    <div class="case-study__scroll-zone" ref="scrollZone">
      <div class="case-study__photo-background-container">
        <div class="case-study__hero-title">
          Grasshopper
        </div>
      </div>      
      <div class="case-study-content-background" ref="contentBackground">
        <div class="case-study__content case-study__row" ref="content">
          
          <div class="case-study__infos" ref="infos">
            <div class="case-study__info">
              <div class="case-study__info__title">Context</div>
              <div class="case-study__info__text">Conversant</div>
            </div>
            <div class="case-study__info">
              <div class="case-study__info__title">Role</div>
              <div class="case-study__info__text">Development</div>
            </div>
            <div class="case-study__info">
              <div class="case-study__info__title">Period</div>
              <div class="case-study__info__text">09/2016 - Present</div>
            </div>                            
          </div>

          <div class="case-study__gh">

            <div class="case-study__row case-study__section">
              <div class="case-study__section-title">Summary</div>
              <div class="case-study__text-content">
                Grasshopper is an Adobe Illustrator extension designed and built to aid Art Directors and Production Artists in building digital advertisement units. It exports HTML5 and JavaScript units with a click of a button.
              </div>
            </div>

            <div class="case-study__photo-background-container">
              <div class="case-study__photo-background"></div>
              <img class="case-study__img" src="/static/assets/imgs/case-study/grasshopper/Grasshopper.jpg" ref="logo">
            </div>

            <case-study-video class="case-study__row case-study__video-row">
              <source src="/static/assets/videos/case-study/grasshopper/gh-animation.mp4" type="video/mp4">
            </case-study-video>     

            <div class="case-study__line case-study__row">
              <div class="case-study__half-block">
                <div class="case-study__section-title">Technology Stack</div>
                <div class="case-study__text-content">
                  <ul>
                    <li>• AngularJS</li>
                    <li>• Sass</li>
                    <li>• Node.js</li>
                    <li>• Express</li>
                    <li>• Adobe ExtendScript</li>
                    <li>• Gulp</li>
                  </ul>
                </div>
              </div>
              <div class="case-study__half-block">
                <div class="case-study__screen-circle">
                  <img class="case-study__img" src="/static/assets/imgs/case-study/grasshopper/Grasshopper_header.jpg"
                  alt="" ref="header">
                </div>
              </div>
            </div> 

          </div>
        </div>
      </div>
      <next-button
        v-for="nextButton in nextButtons"
        :key="nextButton.to"
        v-bind:title="nextButton.title"
        v-bind:to="nextButton.to"
      ></next-button>       
    </div>   
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import NextButton from '@/components/NextButton'
  import CaseStudyVideo from '@/components/CaseStudyVideo'

  import { EventBus } from '../event-bus'
  import SmoothScroll from '@/scripts/Parallax'
  import { TimelineMax, Expo } from 'gsap'
  import _ from 'lodash'

  export default {
    name: 'grasshopper',
    data () {
      return {
        nextButtons: [
          {
            title: 'Up Close & Tasty',
            to: 'ucat'
          }
        ]
      }
    },
    mounted () {
      this.appearAnim()
      this.smoothScroll = new SmoothScroll(0.1, {
        el: this.$refs.scrollZone,
        mouseMultiplier: 0.4
      })
      this.mountParallaxElements()
    },
    beforeDestroy () {
      this.unlistenEvents()
      this.smoothScroll.destroy()
    },
    methods: {
      events () {
        window.addEventListener('resize', _.throttle(this.resize, 200))
      },
      unlistenEvents () {
        window.removeEventListener('resize', _.throttle(this.resize, 200))
      },
      appearAnim () {
        let tl = new TimelineMax({onComplete: this.appear})
          tl.set(this.$el, {autoAlpha: 1})
          tl.fromTo(this.$refs.scrollZone, 0.5, {y: window.innerHeight}, {y: 0, ease: Expo.easeOut})
          tl.staggerFromTo(this.$refs.infos.children, 1, {y: 20, autoAlpha: 0}, {y: 0, autoAlpha: 1, ease: Expo.easeOut, force3D: true}, 0.05, '-=0.3')
      },
      appear () {
        this.smoothScroll.init()
        this.events()
      },
      resize () {
        this.smoothScroll.onResize()
      },
      mountParallaxElements () {
        let parallaxElements = [
          {
            el: this.$refs.logo,
            ratio: 0.05
          },
          {
            el: this.$refs.header,
            ratio: 0.05
          }
        ]
        this.smoothScroll.setParallaxElements(parallaxElements)
      }
    },
    components: {
      Navigation,
      NextButton,
      CaseStudyVideo
    }
  }
</script>

<style lang="scss">
  $text-color-gh: #395440;
  $content-bg-gh: #E1FFD4;

  .case-study-gh {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    font-size: 30px;

    .case-study__content {
      color: $text-color-gh;
    }  

    .case-study-content-background {
      background-color: $content-bg-gh;
    }    

    .case-study__infos {
      background-color: darken($content-bg-gh, 10);
      border-color: darken($content-bg-gh, 20);
    }

    .case-study__section-title {
      &:after {
        background-color: $text-color-gh;
      }
    }

    .case-study__gh {
      font-size: 30px;

      .case-study__photo-background {
        background-color: darken(#030066, 10);
      }

      .case-study__photo {
          margin-top: 100px;
      }

      .case-study__video-row {
        background-color: darken(#030066, 10);
      }

      .case-study__line {
        margin-top: 5em;
      }

      .case-study__screen-circle img {
        width: 350px;
      }
    }  
  }
</style>
