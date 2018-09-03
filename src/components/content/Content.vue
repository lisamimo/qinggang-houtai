<template>
  <div>
  	<Header />
  	<div class="contentWrapper">
  	  <Nav/>
  	    <router-view></router-view>
  	</div>
  </div>
</template>

<script>
import Header from './header/Header.vue';
import Nav from './nav/Nav.vue';

export default {
	name: 'Content',
	data() {
	  return {
	  }
	},
	components: {
		Header,
    Nav,
	},
	methods: {
	},
	mounted() {
	}
}
</script>

<style scoped>
  .contentWrapper {
  	display: flex;
  }
</style>