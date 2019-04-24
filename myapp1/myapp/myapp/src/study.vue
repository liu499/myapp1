<template>
	<div>
		学习
		<mySlot>
			<p>嘟嘟嘟嘟</p>
			<p slot="one">啦啦啦</p>
			<p slot="two">变态变态</p>
			<div slot="three" slot-scope="du">
				{{du.user}}
				<p v-for="d in du.arr">{{d}}</p>
			</div>
		</mySlot>
	</div>
</template>

<script>
	import mySlot from "@/components/mySlot"
	export default {
		name:"study",
		components:{
			mySlot
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
