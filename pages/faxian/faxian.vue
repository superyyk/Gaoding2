<template>
	<view>
		<view style="height: 40px;"></view>
		<view class="p-10 u-f-dr u-f-ac u-f-jsb" :class="isTop ? 'top' : ''">
			<view class=""><text class="f-b-wb">历史策略</text></view>
			<view style="margin-right: 20px;"><image src="../../static/sousuo.png" mode="aspectFill" class="img_25" @click="search"></image></view>
		</view>
		<view class="u-f u-f-ajc">
			   <u-tabs
			        :list="list4"
			        lineWidth="30"
			        lineColor="#f56c6c"
			        :activeStyle="{
			            color: '#303133',
			            fontWeight: 'bold',
			            transform: 'scale(1.05)'
			        }"
			        :inactiveStyle="{
			            color: '#606266',
			            transform: 'scale(1)'
			        }"
			        itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
					@click="change"
			    >
			    </u-tabs>
		</view>
			 
				<view class="p-10 u-f-dc">
					<block v-for="(item,index) in celue_list" :key="index">
						<view class="u-f-dr u-f-ac u-f-jsb m-t-10 p-8" style="background-color: #53c21d; color: #fff; border-radius: 5px;">
						<view class="u-f-dc">
							<view class="u-f-dr u-f-ac">
								<text  style="padding: 2px 10px; font-size: 10px; border: 1px solid #a9e08f;" :style="{color:item.sign=='看涨信号'?'#fff':'#ggg'}">{{item.sign}}</text>
								<text class="f-b-w6 m-l-8">{{item.bi}}</text>
							</view>
							<view class="p-5 u-f-dr u-f-ac" style="color:#606266; font-size: small;">
								<text>{{toTime(item.time*1000)}}</text>
								<text class="m-5">{{item.cate}}</text>
							</view>
						</view>
						<view class="u-f-dc">
							<text class="" style="color:#606266">周期</text>
							<text style="color: #fff;">{{item.zhouqi}}</text>
						</view>
					</view>
					<view>
						 <u-collapse
						                accordion
										style="background-color: #a9e08f; color: #fff;"
						         >
						         <u-collapse-item
						                    title="挂单详情"
											style="color: #606266;"
						            >
						                <u-icon name="tags-fill" size="20" slot="icon"></u-icon>
						                <view class="u-collapse-content">
											<view class="u-f-dc">
											<view class="u-f-dr u-f-ac u-f-jsb f-s" style="color:darkblue;">
												<text>止赢价</text>
												<text>止损价</text>
												<text>命中率</text>
											</view>
											<block v-if="is_vip || item.is_vip=='false'"  v-for="(i,ind) in JSON.parse(item.price)" :key="i">
												<view  class="u-f-dr u-f-ac u-f-jsb">
												<text>{{i.in}}</text>
												<text>{{i.out}}</text>
												<text>79%</text>
											    </view>
											
											</block>
											<view class="p-20 u-f-dc u-f-ac u-f-ajc" v-if="!is_vip" style="position: relative; width: 90%;">
												<!-- <view><text class="doc_name name_">{{cItem.user.talk}}</text></view> -->
												<view class="p-10" style="color: green;">仅VIP会员可查看指标图</view>
												<view class="text-border-line" style="color: crimson;" @click="to_vip">立即开通VIP</view>
											</view>
											<view v-if="is_vip" class=" u-f-dr u-f-ac u-f-w">
												<block v-for="(d,id) in item.imgs" :key="id">
													<view class="m-l-5" @click="add_view(item.imgs)">
														<image :src="d.fImg" mode="aspectFill" class="img_75" ></image>
													</view>
												</block>
											</view>
										
											</view>
											
										</view>
										<text slot="value" class="u-page__item__title__slot-title" style="color: cornflowerblue; ">{{item.is_vip=='true'?'限VIP会员查看':'点击查看'}}</text>
						            </u-collapse-item>
						         
						        </u-collapse>
					</view>
					</block>
				
				</view>
				
		
		
			<tui-modal :show="modal" content="你还没有登陆,请登录!" color="#333" :size="32" :button="buttons" @click="model_click" @cancel="modal_cancel"></tui-modal>
	</view>
</template>

<script>
	var _self
	import tuiModal from '@/components/thorui/tui-modal/tui-modal';
	export default {
		data() {
			return {
				isTop:false ,
				user_uuid:'',
				user_info:'',
				celue_list:[],
				modal:false,
				buttons: [
					{
						text: '取消',
						type: 'red',
						plain: true
					},
					{
						text: '立即登陆',
						type: 'red',
						plain: false
					}
				],
				is_vip:false,
				      list4: [{
				                    name: '全部'
				                }, {
				                    name: '现货',
				                    badge: {
				                        isDot: true
				                    }
				                }, {
				                    name: '合约',
				                }, 
								// {
				    //                 name: '看涨'
				    //             }, {
				    //                 name: '看跌'
				    //             }, {
				    //                 name: '止赢'
				    //             }, {
				    //                 name: '止损'
				    //             },
								],
			}
		},
		components:{
			
			tuiModal
		},
		onPageScroll(e) {
			if(e.scrollTop>40){
				this.isTop=true
			}else{
				this.isTop=false
			}
		},
		onShow() {
		this.user_uuid=this.checkLogin().user_uuid
			if(this.user_uuid){
				console.log(this.user_uuid);
				this.load_user_info()
			}else{
				this.modal=true
			}
			
			this.load_celue('全部')
		},
		methods: {
			add_view(imgs){
				console.log(imgs);
				let urls=[]
				for(let i=0;i<imgs.length;i++){
					urls.push(imgs[i].fImg)
				}
				uni.previewImage({
					urls:urls
				})
			},
			to_vip(){
				uni.navigateTo({
					url:'../hangqing/vip/vip'
				})
			},
			change(e){
				console.log(e);
				_self=this
				this.load_celue(e.name)
			},
			search(){
				
			},
			load_celue(name){
				_self=this
				uni.request({
					url:this.tp_url+'g_load_celue',
					data:{
						name:name
					},
					success(res) {
						_self.celue_list=res.data
					}
				})
			},
			model_click(e) {
				console.log(e);
				if (e.index == 0) {
					this.modal = false;
					uni.navigateTo({
						url: '../login/login'
					});
				} else {
					uni.navigateTo({
						url: '../login/login'
					});
				}
			},
			modal_cancel(e) {
				console.log(e);
			},
			load_user_info() {
				_self = this;
				uni.request({
					url: this.tp_url + 'g_load_user_info',
					data: {
						user_uuid: this.user_uuid
					},
					success(res) {
						if (res.data.res == 200) {
							_self.user_info = res.data.data.user_info;
							let vip = res.data.data.vip_order.filter(item => {
								return item.status == 1;
							});
							if (vip.length > 0) {
								console.log('是会员');
								_self.is_vip = true;
							} else {
								console.log('不是会员');
								_self.is_vip = false;
							}
						} else {
							uni.removeStorageSync('user_uuid');
						}
					}
				});
			},
		}
	}
</script>

<style>
.top {
	width: 100%;
	top: 0px;
	left: 0px;
	height: 80rpx;
	padding-top: 50px;
	position: fixed;
	padding-right: 20px;
	background-color: #fff;
	z-index: 999;
}
</style>
