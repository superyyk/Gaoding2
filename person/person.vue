<template>
	<view style="overflow-x: hidden;">
		<view class="bg"><image class="bg-img" src="/static/my/bg.png" mode=""></image></view>

		<view class="nav" :style="{ paddingTop: statusBarHeight + 'px' }">
			<image class="nav-back" src="/static/my/back.png" mode="" @click="back"></image>
			<text class="nav-title">会员中心</text>
			<view class="nav-space"></view>
		</view>

		<view class="info" :style="{ marginTop: statusBarHeight + 44 + 'px' }">
			<image class="info-bg" src="/static/my/info-bg.png" mode=""></image>

			<view class="info-content">
				<view class="info-avatar"><image class="info-avatar-pic bd-r-50" :src="head" mode="aspectFill"></image></view>
				<view class="info-name" style="margin-bottom: 0px;">
					<text class="info-name">{{ hideTel(user_name) }}</text>
					<view class="u-f-dc">
						<text class="info-level" :class="is_vip ? '' : 'text-border-line'" @click="to_vip">{{ is_vip ? dengji : '立即开通VIP会员' }}</text>
						<view class="u-f-dr u-f-ac" v-if="is_vip">
							<text>VIP过期：</text>
							<Daojishi :day_num="day_num"></Daojishi>
						</view>
					</view>
				</view>
			</view>

			<view class="u-f u-f-dr u-f-ac u-f-jsb " style="padding-left: 20px; padding-right: 20px; color: #FFFFFF; margin-top: -20px;">
				<view class="u-f-dc u-f-ac" @click="to_card_detail(1)">
					<text class="" style="color: #C07C07;">会员卡</text>
					<text class="">{{ card_num }}</text>
				</view>
				<view class="u-f-dc u-f-ac">
					<text class="" style="color: #C07C07;" @click="to_card_detail(0)">未支付</text>
					<text class="">{{ card_no_pay }}</text>
				</view>
				<view class="u-f-dc u-f-ac">
					<text class="" style="color: #C07C07;" @click="to_card_detail(2)">已到期</text>
					<text class="">{{ card_guoqi }}</text>
				</view>
			</view>
		</view>

		<view class="main-title"><text>会员充值</text></view>

		<scroll-view scroll-x>
			<view class="recharge">
				<view
					class="recharge-item"
					:class="current == index ? 'recharge-item-active' : ''"
					v-for="(item, index) in rechargeOptions"
					:key="index"
					:style="{ marginLeft: !index ? '30rpx' : '' }"
					@click="rechargeChange(index)"
				>
					<view class="recharge-tag" v-if="item.showTag"><text class="recharge-tag-text">限时特价 送豪礼</text></view>
					<text class="recharge-item-duration">{{ item.fTitle }}</text>
					<view class="recharge-item-price">
						<text class="rmb">￥</text>
						<text class="recharge-item-price-text">{{ item.fMoney }}</text>
					</view>
					<text class="recharge-item-des">{{ item.shot_content }}</text>
				</view>
			</view>
		</scroll-view>

		<view class="button update" hover-class="hover" @click="updateNow"><text class="button-text">立即开通VIP会员</text></view>
		<view class="tip u-f-dr u-f-ac">
			<!-- <text class="tip">剩余</text><Daojishi :day_num="leve_num"></Daojishi><text>免费体验</text> -->
			<text v-if="order_uid == 'ad001'" class="tip">剩余{{ leve_days }}天免费体验</text>
		</view>

		<view class="main-title"><text>会员特权</text></view>

		<view class="privilege" style="width: 100%;">
			<view class="privilege-item" v-for="(item, index) in privilegeList" :key="index" hover-class="hover" @click="privilegeClick(index)" style="width: 25%;">
				<image class="privilege-item-pic" :src="item.pic" mode=""></image>
				<text class="privilege-item-text">{{ item.text }}</text>
			</view>
			<!-- 管理员 -->
	<!-- 		<view v-if="user_type==1" class="privilege-item" hover-class="hover" @click="privilegeClick()" style="width: 25%;">
				<image class="privilege-item-pic" src="/static/fabuxinwen.png" mode=""></image>
				<text class="privilege-item-text">发布新闻</text>
			</view>
			<view v-if="user_type==1" class="privilege-item" hover-class="hover" @click="privilegeClick()" style="width: 25%;">
				<image class="privilege-item-pic" src="/static/fabucelue.png" mode=""></image>
				<text class="privilege-item-text">发布策略</text>
			</view>
			<view v-if="user_type==0" class="privilege-item" hover-class="hover" @click="privilegeClick()" style="width: 25%;">
				<image class="privilege-item-pic" src="/static/hangqing/shoucang.png" mode=""></image>
				<text class="privilege-item-text">收藏</text>
			</view>
			<view v-if="user_type==0" class="privilege-item" hover-class="hover" @click="privilegeClick()" style="width: 25%;">
				<image class="privilege-item-pic" src="/static/zuji.png" mode=""></image>
				<text class="privilege-item-text">足迹</text>
			</view>
			<view class="privilege-item" hover-class="hover" @click="privilegeClick()" style="width: 25%;">
				<image class="privilege-item-pic" src="/static/yijianfankui.png" mode=""></image>
				<text class="privilege-item-text">意见反馈</text>
			</view>
			<view class="privilege-item" hover-class="hover" @click="privilegeClick()" style="width: 25%;">
				<image class="privilege-item-pic" src="/static/gerenzhongxin.png" mode=""></image>
				<text class="privilege-item-text">个人信息</text>
			</view> -->
		</view>

		<view class="level">
			<view class="level-rate">
				<text class="level-rate-text1">当前返利比例</text>
				<text class="level-rate-text2">25%</text>
			</view>

			<view class="level-info">
				<image class="level-info-icon" src="~@/static/my/vip.png" mode=""></image>
				<text class="level-info-text">V1至尊会员</text>
				<text class="level-info-integral">0</text>
			</view>

			<view class="level-distance">
				<text class="level-distance-text">距V1会员还有1250点</text>
				<view class="button level-distance-button" hover-class="hover"><text class="button-text">查看详情</text></view>
			</view>
		</view>
		<!-- 管理员 -->
		
		<view v-if="user_type==1" class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8 bd-b-1" @tap="to_page(0)" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('发布新闻.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">发布新闻</text>
			</view>
			<view><image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image></view>
		</view>
		
		<view v-if="user_type==1" class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8 bd-b-1" @tap="to_page(1)" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('发布策略.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">发布策略</text>
			</view>
			<view><image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image></view>
		</view>
		
		
		<view class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8 bd-b-1" @tap="to_page(2)" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('分享.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">分享</text>
			</view>
			<view><image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image></view>
		</view>
		<view class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8 bd-b-1" @tap="to_page(3)" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('修改信息.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">修改信息</text>
			</view>
			<view><image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image></view>
		</view>
		<view class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8 bd-b-1" @tap="to_page(4)" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('修改密码.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">修改密码</text>
			</view>
			<view><image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image></view>
		</view>
		<view class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8 bd-b-1" @tap="to_page(5)" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('意见反馈.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">意见反馈</text>
			</view>
			<view><image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image></view>
		</view>
		<view class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8 bd-b-1" @tap="to_page(6)" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('下载.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">下载APP</text>
			</view>
			<view><image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image></view>
		</view>
		<view class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8 bd-b-1" @tap="to_page(7)" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('主题.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">主题</text>
			</view>
			<view><image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image></view>
		</view>
		
		<view class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8 bd-b-1" @tap="to_page(8)" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('语言.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">语言</text>
			</view>
			<view><image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image></view>
		</view>

		<view class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8 bd-b-1" @tap="login_out" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('退出.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">退出登录</text>
			</view>
			<view><image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image></view>
		</view>
	</view>
</template>

<script>
var _self;
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
import Daojishi from '@/components/common/daojishi/daojishi.vue';
export default {
	data() {
		return {
			statusBarHeight,
			current: 0,
			rechargeOptions: [],
			privilegeList: [
				
				{
					pic: '/static/my/red-bag.png',
					text: '更多返利'
				},
			
				{
					pic: '/static/my/share.png',
					text: '分享领券'
				},
				{
					pic: '/static/my/active.png',
					text: '专享活动'
				},
				
			
				{
					pic: '/static/my/kefu.png',
					text: '专属客服'
				}
			],
			user_uuid: '',
			user_info: '',
			is_vip: false,
			user_name: '',
			head: '',
			dengji: '',
			card_num: 0,
			card_no_pay: 0,
			card_guoqi: 0,
			select_item: '',
			day_num: 0,
			leve_days: 0,
			order_uid: 'ad001',
			user_type:0
		};
	},
	components: {
		Daojishi
	},
	onLoad() {
		this.get_vip();
	},
	onShow() {
		this.user_uuid = this.checkLogin().user_uuid;
		this.load_user_info();
	},
	methods: {
		to_page(index){
			switch (index){
				case 0:
				uni.navigateTo({
					url:'publish_news/publish_news'
				})
				break;
				case 1:
				uni.navigateTo({
					url:'publish_celue/publish_celue'
				})
				break;
				case 2:
				uni.navigateTo({
					url:'shear/shear'
				})
				break;
				case 3:
				uni.navigateTo({
					url:'change_info/change_info'
				})
				break;
				case 4:
				uni.navigateTo({
					url:'change_pass/change_pass'
				})
				break;
				case 5:
				uni.navigateTo({
					url:'fankui/fankui'
				})
				break;
				case 6:
				uni.navigateTo({
					url:'download/download'
				})
				break;
				case 7:
				uni.navigateTo({
					url:'zhuti/zhuti'
				})
					break;
				case 8:
				uni.navigateTo({
					url:'lang/lang'
				})
					break;	
				default:
					break;
			}
		},
		to_vip() {
			uni.navigateTo({
				url: '/pages/hangqing/vip/vip'
			});
		},
		to_card_detail(e) {
			uni.navigateTo({
				url: '/pages/hangqing/vip/card_detail/card_detail?card_type=' + e
			});
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
						_self.user_name = _self.user_info.fTel;
						_self.user_type=_self.user_info.fUser_Type;
						_self.head = _self.user_info.fUser_head;

						let vip = res.data.data.vip_order.filter(item => {
							return item.status == 1;
						});
						_self.card_no_pay = res.data.data.vip_order.filter(item => {
							return item.status == 0;
						}).length;
						_self.card_guoqi = res.data.data.vip_order.filter(item => {
							return item.status == 2;
						}).length;
						_self.card_num = res.data.data.vip_order.filter(item => {
							return item.status == 1;
						}).length;
						if (vip.length > 0) {
							console.log('是会员');
							_self.dengji = vip[0].fTip;
							_self.order_uid = vip[0].vip_uid;
							_self.is_vip = true;
							let vip_day_num = vip[0].tian;
							console.log(vip[0].fPay_time);
							let vip_num = _self.level_date(vip[0].fPay_time * 1000, new Date().getTime());
							console.log(new Date().getTime());
							let ntime = new Date().getTime();
							console.log(vip_num);
							let leve_days = vip_day_num - vip_num;
							_self.leve_days = leve_days;
							_self.day_num = vip[0].fPay_time * 1000 + leve_days * 24 * 60 * 60 * 1000 - ntime;
							console.log('剩余：' + leve_days + '天');
						} else {
							console.log('不是会员');
							_self.is_vip = false;
						}
					}
				}
			});
		},
		get_vip() {
			_self = this;
			uni.request({
				url: this.tp_url + 'g_get_vip',
				success(res) {
					_self.rechargeOptions = res.data.data;
					console.log(res);
					_self.current = 0;
				}
			});
		},
		login_out() {
			uni.showModal({
				title: '提示',
				content: '确认退出登陆吗？',
				success(res) {
					if (res.confirm) {
						uni.removeStorage({
							key: 'user_uuid',
							success: function(res) {
								// uni.navigateBack({
								// 	delta:1,
								// 	animationType:'pop-out',
								// 	animationDuration:200
								// })
								//_self.out()
								console.log('退出成功');
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}
						});
					}
				}
			});
		},
		rechargeChange(index) {
			this.current = index;
		},
		updateNow() {
			// uni.showToast({
			// 	icon: "none",
			// 	title: `选择了「${this.rechargeOptions[this.current].duration}」`
			// })
			uni.showModal({
				title:'会员提示',
				content:'是否开通当前VIP会员套餐，订单生成后，请在30分钟内完成支付！',
				confirmText:'立即开通',
				success:(re)=> {
					if(re.confirm){
							this.select_item = this.rechargeOptions[this.current];
			if (this.select_item != '') {
				console.log(this.select_item);
				uni.request({
					url: this.tp_url + 'g_create_order',
					data: {
						user_uuid: this.user_uuid,
						tian: this.select_item.fTian,
						uid: this.select_item.fUid,
						tip: this.select_item.fTip,
						lev: this.select_item.fLev,
						price: this.select_item.fMoney
					},
					success(res) {
						if (res.data.res == 200) {
							console.log(res.data);
							uni.showToast({
								title: res.data.msg
							});
							setTimeout(e => {
								uni.navigateTo({
									url: '/pages/hangqing/vip/pay/pay?price=' + _self.select_item.fMoney + '&order_uid=' + res.data.data
								});
							}, 1500);
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				});
			} else {
				uni.showToast({
					title: '您还没有选择会员套餐',
					icon: 'none'
				});
				return;
			}
					}
				}
			})
			
		
		},
		privilegeClick(index) {
			uni.showToast({
				icon: 'none',
				title: `点击了「${this.privilegeList[index].text}」`
			});
		},
		back() {
			uni.showToast({
				icon: 'none',
				title: '返回'
			});
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
.main-title {
	padding: 30rpx 30rpx;
	font-size: 34rpx;
	color: #1c1c1c;
}

.tip {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	color: #a5a3a2;
}

.rmb {
	font-size: 26rpx;
	color: #e3be83;
}

.bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 400rpx;
	z-index: -2;

	&-img {
		width: 100%;
		height: 100%;
	}
}

.hover {
	opacity: 0.7;
}

.nav {
	position: fixed;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 750rpx;
	height: 44px;
	padding: 0 30rpx;
	background-image: url('~@/static/my/nav-bg.png');
	background-size: 100%;
	z-index: 99;

	&-back {
		width: 20rpx;
		height: 40rpx;
	}

	&-title {
		color: #ffffff;
		font-size: 42rpx;
	}

	&-space {
		width: 70rpx;
		height: 40rpx;
	}
}

.info {
	position: relative;
	padding: 0 15rpx;
	width: 730rpx;
	height: 360rpx;

	&-bg {
		position: absolute;
		width: 730rpx;
		height: 360rpx;
		z-index: -1;
	}

	&-content {
		padding: 70rpx 50rpx 0 50rpx;
		margin-bottom: 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	&-avatar {
		margin-right: 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 85rpx;
		height: 85rpx;
		background-color: #fff;
		padding: 1rpx;
		border-radius: 50%;

		&-pic {
			width: 83rpx;
			height: 83rpx;
		}
	}

	&-name {
		display: flex;
		flex-direction: column;
		color: #ffffff;
		font-size: 35rpx;
	}

	&-level {
		margin-top: 15rpx;
		font-size: 24rpx;
	}

	&-asset {
		padding: 0 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		&-item {
			display: flex;
			flex-direction: column;
		}
	}
}

.iai {
	&-title {
		margin-bottom: 20rpx;
		margin-right: 100rpx;
		font-size: 24rpx;
		color: #cfb386;
	}

	&-value {
		font-size: 35rpx;
		color: #ffffff;
	}
}

.recharge {
	position: relative;
	margin-bottom: 35rpx;
	display: flex;
	flex-direction: row;
	align-items: center;

	&-tag {
		position: absolute;
		top: -2rpx;
		left: -2rpx;
		width: 170rpx;
		height: 36rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-image: url('~@/static/my/tag.png');
		background-size: 100%;

		&-text {
			font-size: 20rpx;
			color: #ffffff;
			text-align: center;
		}
	}

	&-item {
		position: relative;
		padding: 40rpx 0;
		margin-left: 15rpx;
		width: 200rpx;
		height: 230rpx;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: solid 2rpx #f2f2f3;
		border-radius: 12rpx;

		&-active {
			border-color: #edd2a9;
			background-color: #fbf1e5;
		}

		&-duration {
			margin-bottom: 30rpx;
			font-size: 26rpx;
			color: #1c1c1c;
		}

		&-price {
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: baseline;

			&-text {
				font-size: 48rpx;
				color: #e3be83;
			}
		}

		&-des {
			font-size: 22rpx;
			color: #a5a3a2;
		}
	}
}

.button {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 85rpx;
	border-radius: 50rpx;
	background-image: linear-gradient(#efcf9e, #e4bf85);

	&-text {
		font-size: 30rpx;
		color: #1c1c1c;
	}
}

.update {
	margin: 35rpx 30rpx 20rpx 30rpx;
}

.privilege {
	padding: 0 0rpx;
	margin-bottom: 40rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;

	&-item {
		margin: 0 0rpx;
		margin-bottom: 25rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		&-pic {
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 20rpx;
		}

		&-text {
			font-size: 24rpx;
			color: #383738;
		}
	}
}

.level {
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 750rpx;
	height: 466rpx;
	background-image: url('~@/static/my/vip-bg.png');
	background-size: 100%;

	&-rate {
		position: absolute;
		top: 43rpx;
		left: 33rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		&-text1 {
			margin-right: 20rpx;
			color: #1c1c1c;
			font-size: 34rpx;
		}

		&-text2 {
			font-size: 34rpx;
			color: #c07c07;
		}
	}

	&-info {
		// position: absolute;
		// top: 188rpx;
		// left: 350rpx;
		margin-top: 70rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		&-icon {
			margin-bottom: 20rpx;
			width: 48rpx;
			height: 38rpx;
		}

		&-text {
			margin-bottom: 20rpx;
			font-size: 26rpx;
			color: #292929;
		}

		&-integral {
			font-size: 40rpx;
			color: #c07c07;
		}
	}

	&-distance {
		position: absolute;
		left: 30rpx;
		right: 30rpx;
		bottom: 35rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		&-text {
			font-size: 26rpx;
			color: #292929;
		}

		&-button {
			padding: 0 30rpx;
			height: 60rpx;
		}
	}
}
</style>
