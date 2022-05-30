<template>
	<view>
	 <view class="p-10">
		 <block v-for="(item,index) in card_info" :key="index">
			 <view class="u-f-dr u-f-ac u-f-jsb p-5 bd-b-1 m-t-10 animated" hover-class="taba">
				 <view class="u-f-dc">
					<text class="f-b-wb">{{item.fTip}}</text>
					<text class="f-s">{{toTime(item.fTime*1000)}}</text>
				 </view>
				 <view>{{item.tian}}天</view>
				 <view v-if="item.status==0">
					 <!-- <button type="default" size="small">立即支付</button> -->
					 <u-button type="primary" size="small" text="立即支付" @click="to_pay(item)"></u-button>
				 </view>
				 <view v-if="item.status==1">
				 					 <!-- <button type="default" size="small">生效中</button> -->
								<u-button v-if="item.vip_uid!='ad001'" :plain="true" :disabled="disabled" size="small" text="生效中"></u-button>
				 </view>
				 <view v-if="item.status==2">
				 					 <!-- <button type="default" size="small"> 已过期</button> -->
							<u-button :plain="true" :disabled="disabled" size="small" text="已过期"></u-button>
				 </view>
			 </view>
		 </block>
	 </view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				user_uuid:'',
				card_info:'',
				card_type:''
			}
		},
		onLoad(e) {
			this.card_type=e.card_type
			console.log(this.card_type);
			this.user_uuid=this.checkLogin().user_uuid
			this.load_card()
		},
		methods: {
			load_card(){
				_self=this
				uni.request({
					url:this.tp_url+'g_load_card_by_type',
					data:{
						user_uuid:this.user_uuid,
						type:this.card_type
					},
					success(res) {
						_self.card_info=res.data.data
						console.log(res.data);
					}
				})
			},
			to_pay(item){
				uni.navigateTo({
					url:'../pay/pay?price='+item.price+'&order_uid='+item.fOrder_uid
				})
			}
		}
	}
</script>

<style>

</style>
