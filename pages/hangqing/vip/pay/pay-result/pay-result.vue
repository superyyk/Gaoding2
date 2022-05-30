<template>
	<view>
		<view class="p-20 u-f-dc u-f-ajc">
			<image :src="getImgsrc(`${get_order_status_img(status)}`)" mode="aspectFill" style="width: 100px; height: 100px;"></image>
			<text class="p-10">{{get_order_status(status)}}</text>
			<text class="f-s">{{get_order_status_tip(status)}}</text>
		
		<view class="p-10 u-f-dc u-f-ac" style="width: 70%; margin-top: 30px;">
			
			<u-button v-if="status==0" type="success" text="去支付" @click="to_pay"></u-button>
			<!-- <u-button v-if="status==1" type="primary" loading loadingText="等待接单"></u-button> -->
			<u-button v-if="status==3" type="warning" icon="star" text="去点评" @click="to_pinglun"></u-button>
			<view class="m-t-10"></view>
			<u-button v-if="status==0" type="primary" :plain="true" text="取消订单" @click="cancel_order"></u-button>
			<view style="margin-top: 20px;"></view>
			<u-button type="primary" :plain="true" text="返回首页" @click="to_index"></u-button>
		</view>
		</view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				status:0,
				order_uuid:0,
				user_uuid:0,
				order_info:''
			}
		},
		onLoad(e) {
			this.order_info=JSON.parse(e.order_info) 
			console.log(this.order_info);
			this.status=this.order_info.status
		},
		methods: {
			to_pay(){
				uni.navigateTo({
					url:'../pay?uid='+this.order_info.fOrder_uid+'&price='+this.order_info.fMoney
				})
			},
			to_pinglun(){
				uni.navigateTo({
					url:'/pages/order/pinglun/pinglun'
				})
			},
			cancel_order(){
				_self=this
				console.log("取消订单");
				uni.showModal({
					title:'订单提示',
					confirmText:'立即取消',
					content:'是否取消该订单！',
					confirmColor:'red',
					success(re) {
						if(re.confirm){
					uni.request({
					url:_self.tp_url+'g_change_status',
					data:{
						uid:_self.order_info.fOrder_uid,
						status:11
					},
					method:'GET',
					success(res) {
						if(res.data.res==200){
							uni.showToast({
								title:res.data.msg,
								duration:1500
							})
					uni.switchTab({
						url:'/pages/index/index'
					})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none',
								duration:1500
							})
							uni.navigateBack({
								delta:1
							})
						}
					}
				})
						}
					}
				})
	
			},
			to_index(){
			 uni.switchTab({
			 	url:'/pages/index/index'
			 })
			}
		}
	}
</script>

<style>

</style>
