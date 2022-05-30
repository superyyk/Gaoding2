<template>
	<view>
		
		<block v-for="(item1,index1) in fenxiao_list" :key="index1">
			<view class="u-f-dr u-f-jsb u-f-ac">
				<view class="u-f-dr u-f-ac">
					<image :src="item1.fUser_head" mode="aspectFill" style="width: 45px;height: 45px; border-radius: 50px;"></image>
					<view class="m-l-10 f-s">一级分销商：{{item1.fUser_name}}</view>
				</view>				
			</view>			
			<block v-for="(item2,index2) in item1.order" :key="index2">				
			<view  class="u-f-dr u-f-jsb p-10 " style="background-color: #FFFFFF;margin-top: 5px;margin-left: 30px;">
				<view class="u-f-dr">
					<view>
						<image :src="item2.fBig_img" mode="aspectFill" style="height: 45px; width: 45px; border-radius: 50px;"></image>
					</view>
					<view class="u-f-dc">
						<view class="f-b-wb">套餐:{{item2.fClass}} x {{item2.fNum}}组</view>
						<view class="f-s">一级分销商:{{item1.fUser_name}}</view>
					</view>
				</view>
				<view class="u-f-dc">
					<view style="color: #019177; font-size: large; font-weight: 700;">提成:￥{{item2.fPrice*item2.fNum*0.12 | 1000}}</view>
					<view class="f-s">订单总金额:￥{{item2.fPrice*item2.fNum | 1000}}</view>
				</view>
			</view>
			
			</block>
		
		<view class="hr-baise" style="margin: 10px 0px"></view>	
		</block>
	</view>
</template>

<script>
	var _self
	export default{
		data(){
			return{
				
			}
		},
		props:{
			fenxiao_list:Array
		},
		// created() {
		// 	_self=this
			
		// 	setTimeout(function(){
				
		// 		_self.list1=_self.fenxiao_list			  
			   
		// 	},1500)
			
		// },
		// onShow() {			
			
		// },
		methods:{
			// plus(){
			// 	_self=this
			// 	this.money=0				
			// 	for (var i = 0; i < this.list1.length; i++) {
			// 		if(this.list1[i].order.length>0){
			// 			for(var j=0;j<this.list1[i].order.length;j++){
			// 				this.money+=this.list1[i].order[j].fPrice*this.list1[i].order[j].fNum
							 
			// 			}
						
			// 		} 
			// 	}
			// 	console.log(this.money);
			// }
			
			
		}
	}
</script>

<style scoped>
	
</style>
