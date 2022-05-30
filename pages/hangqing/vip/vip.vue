<template>
	<view>
		<view class="p-10">
			<block v-for="(item,index) in vips" :key="index">
				<view class="bd-r-10 bd-1-g p-2 u-f-dr u-f-ac u-f-jsb m-t-10 animated slideInDown" hover-class="bounce" :class="select_id==item.fID?'back':''" @click="select(item)" >
					<view class="u-f-dc" style="width: 30%;">
						<view class="u-f-dr u-f-ac">
								<text class="f-b p-2">{{item.fTitle}}</text>
								<image :src="getImgsrc(get_user_lev_img(item.fID))" mode="aspectFill" class="img_20"></image>
						</view>
					
						<text class="f-s">{{item.fTip}}</text>
						<text style="font-size: xx-small; color: #dbdbdb;">{{item.fContent}}</text>
					</view>
					<view class="f-b" style="width: 30%;" :style="{color:get_user_lev_color(item.fID)}">
						{{item.fTip}}
					</view>
					<view class="u-f-dc u-f-ac" >
						<text>{{item.fTian>36500?'永久VIP会员':item.fTian+'天'}}</text>
						<view class="u-f-dc u-f-ac">
							<text class="old_price c-grey f-s">¥{{item.fOld_price}}</text>
							<text style="color: red; margin: 5px; font-weight: 800;">¥{{item.fMoney}}</text>
						</view>
						
					</view>
				</view>
			</block>
			<view class="p-10 u-f-dc">
				<text class="f-s">注意：如果您当前账户已经是VIP会员，则会在原有基础上天数进行叠加。</text>
			   
			</view>
			<view class="m-t-10 p-20 u-f u-f-ajc">
				<u-button type="success" text="立即开通VIP" @click="buy"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	var _self=this
	export default {
		data() {
			return {
				vips:[],
				select_id:0,
				select_item:'',
				user_uuid:''
			}
		},
		onShow() {
			this.user_uuid=this.checkLogin().user_uuid
			if(this.user_uuid){
				console.log(this.user_uuid);
			}else{
				uni.showToast({
					title:"您未登陆！"
				})
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad() {
		
		uni.setNavigationBarTitle({
			title:'开通/续费VIP会员套餐'
		})
			this.load_vip()
			
		},
		methods: {
			buy(){
				if(this.select_item!=''){
					console.log(this.select_item);
						uni.request({
					url:this.tp_url+'g_create_order',
					data:{
						user_uuid:this.user_uuid,
						tian:this.select_item.fTian,
						uid:this.select_item.fUid,
						tip:this.select_item.fTip,
						lev:this.select_item.fLev,
						price:this.select_item.fMoney
					},
					success(res) {
						if(res.data.res==200){
							console.log(res.data);
							uni.showToast({
								title:res.data.msg
							})
							setTimeout((e)=>{
								uni.navigateTo({
					url:'pay/pay?price='+_self.select_item.fMoney+'&order_uid='+res.data.data
				                })
							},1500)
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}
					
				})
				
				
				}else{
					uni.showToast({
						title:'您还没有选择会员套餐',
						icon:'none'
					})
					return
				}
			
			},
			select(item){
				this.select_id=item.fID
				this.select_item=item
			},
			load_vip(){
				_self=this
				uni.request({
					url:this.tp_url+'g_get_vip',
					success(res) {
						_self.vips=res.data.data
						console.log(res);
						_self.select_id=0
					}
				})
			},
			// 定义动画内容
			            scaleAndScale() {
			                // 定义动画内容
			                this.animation.scale(1.2, 1.2).step() //先放大1,2倍
			                this.animation.scale(1, 1).step() //缩小至原来的大小
			                // 导出动画数据传递给data层
			                this.animationData = this.animation.export(); //每次执行导出动画时 会覆盖之前的动画
			            },
			            noscaleAndScale() {
			                this.animation.scale(1, 1).step()
			                this.animationData = this.animation.export()
			            },
		}
	}
</script>

<style>
.back{
	background-color:#303133;
	color: #fff;
	font-size: large;
	font-weight: 800;
}
</style>
