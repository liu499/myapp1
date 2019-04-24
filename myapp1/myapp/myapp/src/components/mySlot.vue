<template>
	<div>
		我在这里
		<!-- <slot></slot>
		<slot name="one"></slot>
		<slot name="two"></slot>
		<slot name="three" user="21" :arr="arr"></slot> -->
	</div>
</template>

<script>
	export default {
		name:"slot",
		data() {
			return {
				arr:[1,2,3,4]
			};
		}
	}
</script>

<style>

</style>
