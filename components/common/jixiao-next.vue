<template>
	<view style="width: 100%;">
		<block v-for="(item,index) in next" :key="index">			
		<view class="u-f-ac u-f-jsb u-f-dr m-t-5" style="background-color: #F2F2F2; width: 100%; padding: 8px;">
					<view class="u-f-dr u-f-ac">
						<image :src="item.fUser_head" mode="aspectFill" style="height: 45px; width: 45px; border-radius: 50%;"></image>
						<view class="m-l-10 u-f-ac f-b-wb u-f-dr">
						<text>{{ item.fUser_name }}</text>
						<text style="padding: 1px;background-color: #FF9700; color: #FFFFFF; font-size: small; margin-left: 10px;">{{get_type(item.fUser_Type)}}</text>
						</view>
					</view>
					<view class="f-c-base f-b-wb u-f-dc">
					<text>总销售额:￥{{item.order.length==0? "0.00":get_total_money(item.order) | money}}</text>
					<text class="f-s">总算力：{{get_total_suanli(item.order)}}T</text>
						</view>
				</view>				
			
		</block>
	</view>
</template>

<script>
	
	export default{
		data(){
			return{
				
			}
		},
		props:{
			next:Array
		},
		methods:{
			get_total_money(order){
				var total_money=0
				for (var i = 0; i < order.length; i++) {
					total_money+=order[i].fNum*order[i].fPrice
				}
				return total_money
				
			},
			get_total_suanli(order){
				var total_suanli=0
				for (var i = 0; i < order.length; i++) {
					total_suanli+=order[i].fNum*(order[i].fSuanli+order[i].fOther_Suanli)
				}
				return total_suanli
			}
		}
	}
</script>

<style scoped>
	
</style>
