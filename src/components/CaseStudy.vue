<template lang="html">
  <div class="case-study-nav">
		<a class="case-study__link" :to="to" ref="link" @click.prevent="onClick">
			<div class="case-study__title" ref="title">
				{{ title }}
			</div>
			<div class="case-study__hover" ref="hoverLine"></div>
		</a>
  </div>
</template>

<script>
  export default {
    props: [
      'to', 'title'
    ],
    methods: {
      onClick () {
        this.$router.push({name: this.to})
      }
    }
  }
</script>

<style lang="scss">
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
		display: block;
		position: relative;
	}
</style>
