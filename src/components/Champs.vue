<template lang="html">
  <div class="case-study-cs">
    <navigation></navigation>
    <div class="case-study__scroll-zone" ref="scrollZone">
      <div class="case-study__photo-background-container">
        <div class="case-study__hero-title">
          Champs Sports
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
              <div class="case-study__info__text">Prototype Development</div>
            </div>
            <div class="case-study__info">
              <div class="case-study__info__title">Period</div>
              <div class="case-study__info__text">2016</div>
            </div>                            
          </div>

          <div class="case-study__champs">
            <div class="case-study__photo-background-container">
              <div class="case-study__photo-background"></div>
              <img class="case-study__photo" src="/static/assets/imgs/case-study/champs/champssports1.png" ref="logo">
            </div>
            
            <div class="case-study__row case-study__section">
              <div class="case-study__section-title">Summary</div>
              <div class="case-study__text-content">
                Champs Sports was one of the first clients for Conversant's SPACE (Special Project for the Advancement of Creative Elevation) initiative. SPACE is a week-long brainstorming program where a chosen core team is tasked to design a prototype unit that features functionality that has never been previously explored within Conversant. <br/><br/>

                The following is the resultant prototype, which focused on showcasing specific products in a unique way. This prototype received approval for a full production build and won increased adspend from the client.
              </div>
            </div>   

            <case-study-video class="case-study__row case-study__video-row">
              <source src="/static/assets/videos/case-study/champs/ConversantChampsSpaceDemo.mp4" type="video/mp4">
            </case-study-video>   

            <div class="case-study__line case-study__row">
              <div class="case-study__half-block">
                <div class="case-study__section-title">Unit Features</div>
                <div class="case-study__text-content">
                  <ul>
                    <li>• Dynamic elements</li>
                    <li>•&nbsp;Accelerometer -based Parallax</li>
                    <li>• GreenSock Animations</li>
                    <li>• Hold to save a dynamic social image</li>
                  </ul>
                </div>
              </div>            
              <case-study-video class="case-study__half-block case-study__video-row">
                <source src="/static/assets/videos/case-study/champs/Champs_prototype_6.mp4" type="video/mp4">
              </case-study-video>  
            </div>

            <div class="case-study__line case-study__row">            
              <div class="case-study__half-block">
                <div class="case-study__screen-circle">
                  <img class="case-study__photo" src="/static/assets/imgs/case-study/champs/77153_fr_sc7_rs.png"
                  alt="" ref="shoe">
                </div>
              </div>
              <div class="case-study__half-block">
                <div class="case-study__section-title">Technology Stack</div>
                <div class="case-study__text-content">
                  <ul>
                    <li>• JavaScript (Internal Framework)</li>
                    <li>• GreenSock Animation Platform</li>
                    <li>• Parallax.js</li>
                  </ul>
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

  import SmoothScroll from '@/scripts/Parallax'
  import { TimelineMax, Expo } from 'gsap'
  import _ from 'lodash'

  export default {
    name: 'champs',
    data () {
      return {
        nextButtons: [
          {
            title: 'Pepsi Max',
            to: 'pepsi'
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
            el: this.$refs.logo,
            ratio: 0.05
          },
          {
            el: this.$refs.shoe,
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
  $text-color-cs: #283946;
  $content-bg-cs: #AABAC6;

  .case-study-cs {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    font-size: 30px;

    .case-study__content {
      color: $text-color-cs;
    }  

    .case-study__screen-circle {
      background-color: $text-color-cs;
    }

    .case-study-content-background {
      background-color: $content-bg-cs;
    }    

    .case-study__infos {
      background-color: darken($content-bg-cs, 10);
      border-color: darken($content-bg-cs, 20);
    }

    .case-study__section-title {
      &:after {
        background-color: $text-color-cs;
      }
    }

    .case-study__half-block {
      margin: 0 1em;
      transform: translateX(-10%);
    }
    
    .case-study__champs {
      font-size: 30px;

      .case-study__photo-background {
        background-color: $text-color-cs;
      }

      .case-study__photo-background-container {
        margin: 0;
      }

      .case-study__photo {
          margin-top: 100px;
      }

      .case-study__video-row {
        background-color: darken(#283946, 10);
        transform: translateX(-50%);
      }

      .case-study__half-block.case-study__video-row {
        padding: 2em;
        margin-left: 25%;
        width: 60%;
        transform: translateX(0%);
      }

      .case-study__line {
        margin-top: 8em;
      }

      .case-study__section {
        margin: 5em 0;
      }

      .case-study__screen-circle img {
        height: 500px;
      }      
    }  
  }  
</style>
