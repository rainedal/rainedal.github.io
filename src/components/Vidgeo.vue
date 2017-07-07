<template lang="html">
  <div class="case-study-vg">
    <navigation></navigation>
    <div class="case-study__scroll-zone" ref="scrollZone">
      <div class="case-study__photo-background-container">
        <div class="case-study__hero-title">
          Vidgeo
        </div>
      </div>
      <div class="case-study-content-background" ref="contentBackground">
        <div class="case-study__content case-study__row" ref="content">
          <div class="case-study__infos" ref="infos">
            <div class="case-study__info">
              <div class="case-study__info__title">Context</div>
              <div class="case-study__info__text">Personal Project</div>
            </div>
            <div class="case-study__info">
              <div class="case-study__info__title">Role</div>
              <div class="case-study__info__text">UI & UX<br/>Front-End</div>
            </div>
            <div class="case-study__info">
              <div class="case-study__info__title">Period</div>
              <div class="case-study__info__text">2015</div>
            </div>                            
          </div>

          <div class="case-study__vidgeo">
            <div class="case-study__photo-background-container">
              <div class="case-study__photo-background"></div>
              <img class="case-study__img" src="/static/assets/imgs/case-study/vidgeo/N0XAiwf.png" ref="login">
            </div>

            <div class="case-study__row case-study__section">
              <div class="case-study__section-title">Summary</div>
              <div class="case-study__text-content">
                Vidgeo lets users record videos and pin them onto a location on the map. The idea and initial iOS application build was created during a hackathon. I created the experience and branding, sketched rapid prototypes, and created both low and high-fidelity mocks.
              </div>
            </div>

            <div class="case-study__photo-background-container">
              <div class="case-study__photo-background"></div>
              <div class="case-study__half-block">
                <div class="case-study__screen-circle">
                  <img class="case-study__photo" src="/static/assets/imgs/case-study/vidgeo/rARFU1j.png"
                  alt="" ref="phone1">
                </div>
              </div>
              <div class="case-study__half-block">
                <div class="case-study__screen-circle">
                  <img class="case-study__photo" src="/static/assets/imgs/case-study/vidgeo/Qcpv1p8.png"
                  alt="" ref="phone2">
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

  import SmoothScroll from '@/scripts/Parallax'
  import { TimelineMax, Expo } from 'gsap'
  import _ from 'lodash'

  export default {
    name: 'vidgeo',
    data () {
      return {
        nextButtons: [
          {
            title: 'Grasshopper',
            to: 'grasshopper'
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
        window.addEventListener('wheel', this.wheel)
        window.addEventListener('resize', _.throttle(this.resize, 200))
      },
      unlistenEvents () {
        window.removeEventListener('wheel', this.wheel)
        window.removeEventListener('resize', _.throttle(this.resize, 200))
      },
      appearAnim () {
        let tl = new TimelineMax({onComplete: this.appear})
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
      wheel () {
        // hey
      },
      mountParallaxElements () {
        let parallaxElements = [
          {
            el: this.$refs.login,
            ratio: 0.04
          },
          {
            el: this.$refs.phone1,
            ratio: 0.05
          },
          {
            el: this.$refs.phone2,
            ratio: 0.05
          }
        ]
        this.smoothScroll.setParallaxElements(parallaxElements)
      }
    },
    components: {
      Navigation,
      NextButton
    }
  }
</script>

<style lang="scss">
  $text-color-vg: #7F6A3C;
  $content-bg-vg: #FFEBC0;

  .case-study-vg {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    font-size: 30px;

    .case-study__content {
      color: $text-color-vg;
    }  

    .case-study-content-background {
      background-color: $content-bg-vg;
    }    

    .case-study__infos {
      background-color: darken($content-bg-vg, 10);
      border-color: darken($content-bg-vg, 20);
    }

    .case-study__section-title {
      &:after {
        background-color: $text-color-vg;
      }
    }

    .case-study__vidgeo {
      font-size: 30px;

      .case-study__photo-background {
        background-color: $text-color-vg;
      }

      .case-study__photo {
          margin-top: 100px;
      }

      .case-study__section {
        margin: 5em 0;
      }
    }  
  }  
</style>
