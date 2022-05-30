<template>
	<view>
		<view v-if="show==true" class="u-f u-f-ajc p-10">
			<text class="p-15 c-grey">暂无{{title}}消息记录！</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"null-msg",
		props: {
		  title: {
		    type: String,
		    default: '',
		    
		  },
		  show:{
			  type:Boolean,
			  default:false
		  }
		  },
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
