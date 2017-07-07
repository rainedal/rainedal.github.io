<template lang="html">
  <a class="next-button"
    :class="{'is-hiding': isHiding}"
    @click.prevent.once="onClick"
    @mouseover.prevent="onMouseOver"
    @mouseout.prevent="onMouseOut">
    <div class="next-button__content" ref="buttonContent">
      <div class="next-button__subtitle">Next project</div>
      <div class="next-button__title-container">
        <span class="next-button__title">
          {{ title }}
          <div class="next-button__line" ref="hoverLine"></div>
        </span>
      </div>
    </div>
    <div class="next-button__background" ref="background"></div>
  </a>
</template>

<script>
  import { TimelineMax, Expo } from 'gsap'
  import { EventBus } from '../event-bus'

  import MenuStore from '@/stores/MenuStore'

  export default {
    name: 'next-button',
    props: [
      'to', 'title'
    ],
    data () {
      return {
        state: MenuStore.state,
        blocked: false,
        isHiding: false
      }
    },
    mounted () {
      this.mouseOverAnim = new TimelineMax({paused: true})
      this.mouseOverAnim.to(this.$refs.hoverLine, 0.5, {autoAlpha: 1, scaleX: 1, ease: Expo.easeOut})
    },
    methods: {
      onClick () {
        let parentSmoothScroll = this.$parent.smoothScroll
        let offset = (parentSmoothScroll.height - window.innerHeight) * -1
        MenuStore.blockMenu()
        parentSmoothScroll.scrollTo(offset, this.nextProject)
        parentSmoothScroll.off()
      },
      nextProject () {
        this.blocked = true
        this.leaveAnim()
      },
      leaveAnim () {
        let tl = new TimelineMax({onComplete: () => {
          MenuStore.unblockMenu()
          this.$router.push({name: this.to})
        }})
        tl.add(this.mouseOverAnim.reverse())
        tl.to(this.$refs.background, 0.75, {scaleY: 1.1, ease: Expo.easeOut}, '-=0.1')
        tl.staggerTo(this.$refs.buttonContent.children, 0.7, {y: -200, autoAlpha: 0, ease: Expo.easeIn}, 0.06, '-=1')
        tl.call(this.hideCaseStudy)
        tl.to(this.$refs.background, 0.75, {transformOrigin: '0% 0%', scaleY: 0, ease: Expo.easeOut})
      },
      hideCaseStudy () {
        TweenLite.set(this.$parent.$el, {autoAlpha: 0})
        this.isHiding = true
      },
      onMouseOver () {
        !this.blocked && this.mouseOverAnim.play()
      },
      onMouseOut () {
        !this.blocked && this.mouseOverAnim.reverse()
      }
    }
  }
</script>

<style lang="scss">
  .next-button {
    color: #ffffff;
    cursor: pointer;
    position: relative;
    width: 100%;
    padding: 1em 0em;
    font-size: 70px;
    display: block;
    text-align: center;
    background-image: linear-gradient(-30deg, #FFCAD5 -10%, #AEE2FF 100%);
  }

  .next-button__title {
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    letter-spacing: .05em;
    position: relative;
    padding: 0em .1em;
  }

	.next-button__subtitle {
		font-family: 'Source Code Pro', monospace;
		font-size: .3em;
    font-weight: 300;
		letter-spacing: .05em;
		margin-bottom: .1em;
	}

  .next-button__line {
		width: 90%;
		height: 5px;
		opacity: 0;
		position: absolute;
		left: 5%;
		top: 100%;
    background-color: #ffffff;
    transform: translate3d(0px, -50%, 0px) scaleX(0);
    transform-origin: center;
  }

	.next-button__background {
    background-image: linear-gradient(-30deg, #FFCAD5 -10%, #AEE2FF 100%);
		width: 100%;
		height: 100vh;
		bottom: 0px;
		left: 0px;
		transform: scaleY(0);
		transform-origin: bottom;
		position: absolute;
		z-index: 9;
	}  

  .next-button__content {
    position: relative;
  }
</style>
