<template lang="html">
  <div class="case-study-ucat">
    <navigation></navigation>
    <div class="case-study__scroll-zone" ref="scrollZone">   
      <div class="case-study__photo-background-container">     
        <div class="case-study__hero-title">
          Up Close & Tasty
        </div>
      </div>
      <div class="case-study-content-background" ref="contentBackground">
        <div class="case-study__content case-study__row" ref="content">
          <div class="case-study__infos" ref="infos">
            <div class="case-study__info">
              <div class="case-study__info__title">Context</div>
              <div class="case-study__info__text">Freelance</div>
            </div>
            <div class="case-study__info">
              <div class="case-study__info__title">Role</div>
              <div class="case-study__info__text">Development<br/>Consulting</div>
            </div>
            <div class="case-study__info">
              <div class="case-study__info__title">Period</div>
              <div class="case-study__info__text">11/2016 - Present</div>
            </div>                            
          </div>

          <div class="case-study__ucat">
            <div class="case-study__photo-background-container">
              <div class="case-study__photo-background"></div>
              <img class="case-study__img" src="/static/assets/imgs/case-study/ucat/upcloseandtasty_logo.jpg" ref="logo">
            </div> 
            <div class="case-study__row case-study__section">
              <div class="case-study__section-title">Summary</div>
              <div class="case-study__text-content">
                Up Close & Tasty is a food photography blog powered by the WordPress platform. I assisted the owner in migrating the blog from Squarespace to WordPress, and have been implementing various custom stylistic and functional tweaks across the site in order to improve and smoothen its user experience.
              </div>
            </div>  

            <div class="case-study__line case-study__row-button">
              <div class="case-study__photo-background"></div>
              <link-button url="http://upcloseandtasty.com" text="visit the website"></link-button>
            </div>            

						<div class="case-study__full-screenshot">
							<img class="case-study__full-screenshot__bg"
								src="/static/assets/imgs/case-study/ucat/screen-bg.svg"
								alt="" ref="bg1">							
							<img class="case-study__full-screenshot__img case-study__row case-study__img"
								src="/static/assets/imgs/case-study/ucat/2017-07-06-21-40-upcloseandtasty.com.png"
								alt="" ref="main">
						</div>

            <div class="case-study__line case-study__row">
              <div class="case-study__photo-background"></div>
              <div class="case-study__half-block">
                <div class="case-study__screen-circle">
                  <img class="case-study__img" src="/static/assets/imgs/case-study/ucat/smores_popsicles_upcloseandtasty_07b.jpg"
                  alt="" ref="smores">
                </div>
              </div>

              <div class="case-study__half-block">
                <div class="case-study__section-title">Technology Stack</div>
                <div class="case-study__text-content">
                  <ul>
                    <li>• JavaScript</li>
                    <li>• HTML</li>
                    <li>• CSS</li>
                    <li>• PHP</li>
                  </ul>
                </div>
              </div>
            </div> 

					  <div class="case-study__full-screenshot">
							<img class="case-study__full-screenshot__bg"
								src="/static/assets/imgs/case-study/ucat/screen-bg.svg"
								alt="" ref="bg2">							
							<img class="case-study__full-screenshot__img case-study__row case-study__img"
								src="/static/assets/imgs/case-study/ucat/2017-07-06-21-46-upcloseandtasty.com.png"
								alt="" ref="main2">
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
  import LinkButton from '@/components/LinkButton'

  import SmoothScroll from '@/scripts/Parallax'
  import { TimelineMax, Expo } from 'gsap'
  import _ from 'lodash'

  export default {
    name: 'ucat',
    data () {
      return {
        nextButtons: [
          {
            title: 'Champs Sports',
            to: 'champs'
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
            ratio: 0.03
          },
          {
            el: this.$refs.main,
            ratio: 0.04
          },
          {
            el: this.$refs.smores,
            ratio: 0.04
          },
          {
            el: this.$refs.bg1,
            ratio: -0.2
          },
          {
            el: this.$refs.main2,
            ratio: 0.04
          },
          {
            el: this.$refs.bg2,
            ratio: -0.2
          }
        ]
        this.smoothScroll.setParallaxElements(parallaxElements)
      }
    },
    components: {
      Navigation,
      NextButton,
      LinkButton
    }
  }
</script>

<style lang="scss">
  $text-color-ucat: #524437;
  $content-bg-ucat: #EBD6C5;

  .case-study-ucat {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    font-size: 30px;

    .slide-img__shape {
      display: block;
      position: absolute;
      z-index: -100;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, -100px);

      @media screen and (max-width: 1500px){
        max-width: 300px;
      }
    }

    .slide__button {
      padding: .9em 2em;
      border-style: solid;
      border-width: 1px;
      border-radius: 3px;

      display: inline-block;
      position: relative;

      font-family: 'Oswald', sans-serif;
      text-decoration: none;
      font-size: 1em;
      letter-spacing: .09em;
      text-transform: uppercase;
      color: #EBD6C5;
      overflow: hidden;
      cursor: pointer;

      // @media screen and (max-width: 1500px){
      //   font-size: 15px;
      // }
    }  

    .case-study__row-button {
      margin: auto;
      justify-content: center;
    }  

    .case-study__half-block {
      margin: 0 1em;
    }

    .case-study__line {
        margin: 10em 0; 
        color: #EBD6C5;
    }

    .case-study__content {
      color: $text-color-ucat;
    }  

    .case-study-content-background {
      background-color: $content-bg-ucat;
    }    

    .case-study__infos {
      background-color: darken($content-bg-ucat, 10);
      border-color: darken($content-bg-ucat, 20);
    }

    .case-study__section-title {
      &:after {
        background-color: $text-color-ucat;
      }
    }

    .case-study__ucat {
      font-size: 30px;

      .case-study__photo-background {
        background-color: darken(#303E48, 5);
      }

      .case-study__photo {
          margin-top: 100px;
      }

      .case-study__section {
        margin: 5em 0;
      }

      .case-study__screen-circle img {
        width: 350px;
      }      
    }  
  }  
</style>
