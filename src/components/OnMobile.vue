<template lang="html">
	<div class="on-mobile">
		<about-content :isMobile="true" ></about-content>
	</div>
</template>

<script>
  import AboutContent from '@/components/AboutContent'

  export default {
    components: {
      AboutContent
    }
  }
</script>

<style lang="scss">
	.on-mobile {
		position: absolute;
		z-index: 1000;
		top: 0px;
		height: 0px;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(-30deg, #FFCAD5 -10%, #AEE2FF 100%);
		display: none;
		overflow: scroll;

		@media screen and (max-width: 960px) {
			display: block;
		}
	}
</style>
