<template lang="html">
  <div class="case-study-pm">
    <navigation></navigation>
    <div class="case-study__scroll-zone" ref="scrollZone">
      <div class="case-study__photo-background-container">
        <div class="case-study__hero-title">
          Pepsi Max
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
              <div class="case-study__info__text">Front-End Development</div>
            </div>
            <div class="case-study__info">
              <div class="case-study__info__title">Period</div>
              <div class="case-study__info__text">2015</div>
            </div>                            
          </div>

          <div class="case-study__pepsi">
            <div class="case-study__row case-study__section">
              <div class="case-study__section-title">Summary</div>
              <div class="case-study__text-content">
                The Pepsi Max unit features a game of falling cans. Every can clicked grants two points, while clicking a red cherry blast Pepsi Max can grants bonus points. The more cans clicked, the faster the cans fall.
              </div>
            </div>

            <div class="case-study__photo-background-container">
              <div class="case-study__photo-background"></div>
              <img class="case-study__img case-study__img-cap" src="/static/assets/imgs/case-study/pepsi/181q62u.png" ref="game">
            </div>

            <div class="case-study__line case-study__row">
              <div class="case-study__half-block">
                <div class="case-study__section-title">Technology Stack</div>
                <div class="case-study__text-content">
                  <ul>
                    <li>• JavaScript (Internal Framework)</li>
                    <li>• GreenSock Animation Platform</li>
                  </ul>
                </div>
              </div>
              <div class="case-study__half-block">
                <div class="case-study__screen-circle">
                  <img class="case-study__photo" src="/static/assets/imgs/case-study/pepsi/Pepsi_MAX_Cherry_16.png"
                  alt="" ref="can">
                </div>
              </div>
            </div> 

            <case-study-video class="case-study__row case-study__video-row">
              <source src="/static/assets/videos/case-study/pepsi/video.mp4" type="video/mp4">
            </case-study-video>

            <div class="case-study__line case-study__row-button">
              <div class="case-study__photo-background"></div>
              <link-button url="http://img.mediaplex.com/content/0/0/ActiveLink_jsonly.htm?id=29110-213608-17922-1&ad_url=http://adfarm.mediaplex.com/ad&mpcr=57266411&mpcrset=root" text="play the demo"></link-button>
              <div class="case-study__text-content-button">(turn off any adblockers)</div>
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
  import LinkButton from '@/components/LinkButton'

  import SmoothScroll from '@/scripts/Parallax'
  import { TimelineMax, Expo } from 'gsap'
  import _ from 'lodash'

  export default {
    name: 'pepsi',
    data () {
      return {
        nextButtons: [
          {
            title: 'Vidgeo',
            to: 'vidgeo'
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
            el: this.$refs.can,
            ratio: 0.05
          },
          {
            el: this.$refs.game,
            ratio: 0.02
          }
        ]
        this.smoothScroll.setParallaxElements(parallaxElements)
      }
    },
    components: {
      Navigation,
      NextButton,
      CaseStudyVideo,
      LinkButton
    }
  }
</script>

<style lang="scss">
  $text-color-pm: #3A2523;
  $content-bg-pm: #BAA8A6;

  .case-study-pm {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    font-size: 30px;

    .case-study__content {
      color: $text-color-pm;
    }  

    .case-study-content-background {
      background-color: $content-bg-pm;
    }    

    .case-study__infos {
      background-color: darken($content-bg-pm, 10);
      border-color: darken($content-bg-pm, 20);
    }

    .case-study__section-title {
      &:after {
        background-color: $text-color-pm;
      }
    }

    .case-study__text-content-button {
      display: inline-block;
      text-align: center;
      color: $content-bg-pm;
      z-index: 1;
      font-weight: 300;
    }

    .slide__button {
      padding: .9em 2em;
      border-style: solid;
      border-width: 1px;
      border-radius: 3px;

      display: block;
      position: relative;

      font-family: 'Oswald', sans-serif;
      text-decoration: none;
      font-size: 1em;
      letter-spacing: .09em;
      text-transform: uppercase;
      color: $content-bg-pm;
      overflow: hidden;
      cursor: pointer;
    }      

    .case-study__row-button {
      margin: auto;
      justify-content: center;
    }  

    .case-study__pepsi {
      font-size: 30px;

      .case-study__line {
        margin: 10em 0; 
      }
      
      .case-study__section {
        margin: 5em 0;
      }

      .case-study__img-cap {
        width: 700px;
      }

      .case-study__video-row {
        background-color: $text-color-pm;
        margin: 0;
        transform: translateX(-13%);
      }

      .case-study__photo-background,
      .case-study__screen-circle {
        background-color: $text-color-pm;
      }

      .case-study__screen-circle img {
        height: 500px;
      }      
    }  
  }  
</style>
