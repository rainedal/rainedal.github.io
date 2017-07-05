<template lang="html">
  <div class="case-study">
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
              <img class="case-study__photo" src="/static/assets/imgs/case-study/maje/woman.png"
              srcset="/static/assets/imgs/case-study/maje/woman@2x.png 2x" ref="woman">
            </div>

            <div class="case-study__row case-study__section">
              <div class="case-study__section-title">Summary</div>
              <div class="case-study__text-content">
                Champs Sports SPACE is something something something
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
          tl.fromTo(this.$refs.scrollZone, 0.8, {y: window.innerHeight}, {y: 0, ease: Expo.easeOut})
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
            el: this.$refs.woman,
            ratio: 0.1
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
  $text-color-cs: #000000;
  $content-bg-cs: #cc0000;

	.case-study {
		height: 100%;
    width: 100%;
		position: relative;
		z-index: 1;
		font-size: 30px;
	}

	.case-study__content {
		min-height: 100%;
		color: $text-color-cs;
	}  

	.case-study-content-background {
		width: 100%;
		height: 100%;
    background-color: $content-bg-cs;
		padding-bottom: 5em;
	}

	.case-study__row {
		width: 760px;
		margin: auto;
	}

	.case-study__scroll-zone {
		position: absolute;
		width: 100%;
	}

	.case-study__infos {
		font-size: 21px;
		padding: 2em 2.5em;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
    background-color: darken($content-bg-cs, 10);
		transform: translateY(-50%);
		transform-origin: bottom;
    border-width: 2px;
    border-color: darken($content-bg-cs, 20);
    border-style: solid;
	}

	.case-study__info {
		display: inline-block;
		text-align: center;
		margin-left: 5em;

		&:first-child {
			margin-left: 0px;
		}

	}    

	.case-study__info__title {
    font-family: 'Oswald', sans-serif;
		text-transform: uppercase;
		letter-spacing: .08em;
		margin-bottom: .2em;
	}

	.case-study__info__text {
		font-family: 'Source Code Pro', monospace;
		text-transform: capitalize;
		font-size: .9em;
		opacity: .6;
	}  

  .case-study__hero-title {
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    font-size: 4em;
  }

	.case-study__photo-background-container {
		height: 400px;
		display: flex;
		justify-content: center;
		align-items: center;

		margin: 250px 0px;
	}

	.case-study__photo-background {
		position: absolute;
		left: 0px;
		width: 100%;
		height: 400px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.case-study__photo  {
		position: relative;
		display: block;
	}

	.case-study__typography {
		font-size: 30px;
	}

	.case-study__typography-block {
		margin-top: 1em;
		padding: 1.8em 1.8em;
		background-color: darken(#011933, 2);
	}

	.case-study__typo-img {
		margin-top: .5em;
	}

	.case-study__mini-title {
		font-family: 'Oswald', sans-serif;
		text-transform: uppercase;
		letter-spacing: .07em;
		font-size: .8em;
		opacity: .3;
	}

	.case-study__colors {
		font-size: 30px;
		margin-top: 6em;
	}

	.case-study__color-block {
		display: inline-block;
		margin-left: 1.3em;

		&:first-child {
			margin-left: 0em;
		}

	}

	.case-study__color {
		height: 3em;
		width: 3em;
		border-radius: 50%;
	}

	.case-study__section-title {
		font-family: 'Oswald', sans-serif;
		letter-spacing: .09em;
		text-transform: uppercase;
		margin-bottom: 1.3em;
    text-align: left;

		&:after {
			content: '';
			margin-top: .2em;
			display: block;
			width: 1em;
			height: 2px;
			background-color: $text-color-cs;
		}
	}

	.case-study__text-content {
		font-family: 'Source Code Pro', monospace;
		font-size: 16px;
		line-height: 2em;
		opacity: .7;
    text-align: left;
	}

	.case-study__line {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.case-study__half-block {
		position: relative;
		display: inline-block;
		width: 50%;
	}

	.case-study__mobile-screen {
		margin: auto;
		position: relative;
		width: 50%;
	}

	.case-study__screen-circle {
		width: 350px;
		border-radius: 50%;
		height: 350px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.case-study__full-screenshot {
		width: 100%;
		margin-top: 10em;
	}

	.case-study__full-screenshot__bg {
		width: 100%;
		margin-top: 160px;
		position: absolute;
		left: 0px;
	}

	.case-study__full-screenshot__img {
		display: block;
		position: relative;
	}

	.case-study__img {
		box-shadow: 0 0 30px 0 rgba(0,0,0,.40);
	}

  .case-study__champs {
    font-size: 30px;

    .case-study__photo-background {
      background-color: #313596;
    }

    .case-study__photo {
        margin-top: 100px;
    }

    .case-study__section {
      margin-top: 10em;
      margin-bottom: 6em;
    }
  }  
</style>
