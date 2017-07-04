<template lang="html">
  <div class="case-study">
		<a class="case-study__link" :to="to" ref="link" @click.prevent="onClick">
			<div class="case-study__title" ref="title">
				{{ title }}
			</div>
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

<style>
	.case-study__link {
		text-decoration: none;
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
