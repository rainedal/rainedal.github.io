<template lang="html">
  <div class="case-study-nav" @mouseover="mouseover" @mouseout="mouseout">
    <a class="case-study__link" :to="to" ref="link" @click.prevent="onClick">
      <span class="case-study__title" ref="title">
        {{ title }}
        <div class="case-study__hover" ref="hoverLine"></div>
      </span>
    </a>
  </div>
</template>

<script>
  import { TimelineMax, Expo } from 'gsap'
  import { EventBus } from '../event-bus'
  import menuStore from '@/stores/MenuStore'

  export default {
    props: [
      'to', 'title'
    ],
    data () {
      return {
        state: menuStore.state
      }
    },
    mounted () {
      this.mouseOverAnim = new TimelineMax({paused: true})
      this.mouseOverAnim.to(this.$refs.hoverLine, 0.5, {autoAlpha: 1, scaleX: 1, ease: Expo.easeOut})
    },
    methods: {
      onClick () {
        this.$router.push({name: this.to})
      },
      mouseover () {
        this.mouseOverAnim.play()
      },
      mouseout () {
        this.mouseOverAnim.reverse()
      }
    }
  }
</script>

<style lang="scss">
  .case-study-nav {
    margin-bottom: 50px;
    transform: translateY(200px);
    &:last-child {
      margin-bottom: 0px;
    }        
  }

  .case-study__link {
    text-decoration: none;
    user-select: none;
    cursor: pointer;
  }

  .case-study__title {
    font-size: 112px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-family: 'Oswald', sans-serif;
    position: relative;
  }

  .case-study__hover {
		width: 90%;
		height: 5px;
		opacity: 0;
		position: absolute;
    left: 5%;
		top: 98%;
    background-color: #ffffff;
    transform: translate3d(0px, -50%, 0px) scaleX(0);
    transform-origin: center;
  }	

  .case-study__content {
    min-height: 100%;
  }  

  .case-study-content-background {
    width: 100%;
    height: 100%;
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
    padding: 2em 0em;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
    transform-origin: bottom;
    border-width: 2px;
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
    line-height: 1.2em;
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
      margin-top: .7em;
      display: block;
      width: 1em;
      height: 2px;
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
</style>
