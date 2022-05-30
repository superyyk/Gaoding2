<template>
	<view class="container">
		<view style="height: 40px;"></view>
		<view class="p-10 u-f-dr u-f-ac u-f-jsb" :class="isTop ? 'top' : ''">
			<view class=""><text class="f-b-wb">发现</text></view>
			<view style="margin-right: 20px;"><image src="../../static/saixuan.png" mode="aspectFill" class="img_25" @click="shaixuan"></image></view>
		</view>
		<view class="set_box" v-for="(item, index) in talk" :key="index">
			<view class="set_time">
				<view>{{ item.MMDD }}</view>
			</view>
			<!-- 步骤条 -->
			<view class="set-1">
				<view class="set-2">
					<view class="tlak_o" v-for="(cItem, index_) in item.data" :key="index_">
						<!-- 	<view class="docter like_">
							<view class="doc_say like_o">
								<view class="doc_head like_h">
									<text class="doc_name name_">{{cItem.doc.d_name}}</text>
									<text class="doc_time time_">{{cItem.doc.HMS}}</text>
								</view>
								<view class="doc_talk like_talk">
									<text>{{cItem.doc.talk}}</text>
								</view>
							</view>
						</view> -->
						<view class="user like_ ">
							<view class="user_say like_o">
								<view class="user_head like_h u-f-dr u-f-ac" @click="to_detail(cItem)">
									<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="30" height="30"></u--image>
									<text class="doc_name name_ m-l-8 ">{{ cItem.user.u_name }}</text>
									<text
										v-if="cItem.user.is_hot"
										style="background-color: red; color: aliceblue; padding: 1px 5px; font-size: x-small; font-weight: 700; border-radius: 5px;"
									>
										热门
									</text>
									<text class="doc_time time_ m-l-8">{{ cItem.user.HMS }}</text>
								</view>
								<view class="user_talk like_talk">
									<text @click="to_detail(cItem)">{{ cItem.user.talk }}</text>
									<view class="like_img" v-if="cItem.user.imgUrl">
										<view class="p-20 u-f-dc u-f-ac u-f-ajc" v-if="cItem.user.is_vip == true && !is_vip" style="position: relative; width: 90%;">
											<!-- <view><text class="doc_name name_">{{cItem.user.talk}}</text></view> -->
											<view class="p-10" style="color: green;">仅VIP会员可查看指标图</view>
											<view class="text-border-line" style="color: crimson;" @click="to_vip">立即开通VIP</view>
										</view>
										<block v-for="(pic, ind) in cItem.user.imgUrl" :key="ind">
											<image v-if="!cItem.user.is_vip || is_vip" :src="pic" @click="choose_img(cItem.user.imgUrl, index)"></image>
										</block>

										<!-- <view v-if="cItem.user.imgUrl.length>4" style="height: 100%; border: 1px solid orangered; width: 10px; font-size: small; word-wrap: break-word; letter-spacing: 10px;">更多详解</view> -->
									</view>
								</view>
							</view>
						</view>

						<view class="p-8 u-f-dr u-f-ac u-f-jsb bd-b-1">
							<view class="u-f-dc u-f-ac">
								<text class="f-s" style="font-weight: 800;">20</text>
								<image src="../../static/hangqing/pinglun1.png" mode="aspectFill" class="img_25"></image>
							</view>
							<view class="u-f-dc u-f-ac">
								<text class="f-s" style="font-weight: 800;">20</text>
								<image src="../../static/hangqing/dianzan2.png" mode="aspectFill" class="img_25"></image>
							</view>
							<view class="u-f-dc u-f-ac">
								<text class="f-s" style="font-weight: 800;">20</text>
								<image src="../../static/hangqing/shoucang.png" mode="aspectFill" class="img_25"></image>
							</view>
							<view class="u-f-dc u-f-ac">
								<text class="f-s" style="font-weight: 800;">200</text>
								<image src="../../static/hangqing/cai.png" mode="aspectFill" class="img_20"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<uni-drawer ref="showRight" mode="right" :mask-click="true">
			<scroll-view style="height: 100%; padding-top: 40px;" scroll-y="true">
				<button @click="closeDrawer" type="primary" style="width: 60%;">确定</button>
				<!-- <view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view> -->
				<view class="p-10 u-f-dr u-f-w">
					<block v-for="(item, index) in shaixuan_list" :key="">
						<view class="bd-r-5 bd-1-g p-8 m-5" @click="choose(item, index)" :style="{ background: item.is_click ? 'red' : '', color: item.is_click ? '#fff' : '' }">
							{{ item.key }}
						</view>
					</block>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
var _self;
import Drawer from '@/components/uni-drawer/uni-drawer.vue';
export default {
	data() {
		return {
			isTop: false,
			shaixuan_list: [
				{
					id: 1,
					key: '准确率最高',
					is_click: false
				},
				{
					id: 2,
					key: '准确率最低',
					is_click: false
				},
				{
					id: 3,
					key: '大师解说',
					is_click: false
				},
				{
					id: 4,
					key: '最新发布',
					is_click: false
				},
				{
					id: 5,
					key: '仅会员可观看',
					is_click: false
				}
			],
			user_uuid: '',
			user_info: '',
			is_vip: false,
			talk: []
		};
	},
	components: {
		Drawer
	},
	onReachBottom() {
		console.log('bottom');
	},
	onPageScroll(e) {
		if (e.scrollTop > 0) {
			this.isTop = true;
		} else {
			this.isTop = false;
		}
	},
	onShow() {
		this.user_uuid = this.checkLogin().user_uuid;
		this.load_user_info();
		this.load_infos()
	},
	methods: {
		load_infos(){
			_self=this
			this.talk=[]
			uni.request({
				url:this.tp_url+'g_load_all_celue',
				success(res) {
					let l=res.data
					for(let i=0;i<l.length;i++){
						// id: 3,
						// MMDD: '1月21',
						// data: [
						// user: {
						// 	u_name: '李四',
						// 	HMS: '10:20:18',
						// 	is_vip: false,
						// 	is_hot: false,
						// 	talk: '测试数据测试数据测试数据',
						// 	imgUrl: ['/static/p2.jpg', '/static/logo.jpg']
						// }
						var imgs=[]
						if(l[i].imgs.length>0){
							for(let j=0;j<l[i].imgs.length;j++){
							imgs.push(l[i].imgs[j].fImg)
						      }
							  console.log(imgs);
						}
						
						_self.talk.push({
							id:l[i].fID,
							MMDD:_self.getDate(l[i].time*1000),
							data:[
								{
								user:{
								u_name:_self.hideTel(l[i].user_info.fTel) ,
								HMS:_self.toTime(l[i].time*1000),
								is_vip:l[i].is_vip=='true'?1:l[i].is_vip=='false'?0:'',
								is_hot:l[i].fID%4==0?true:false,
								talk:l[i].fTitle,
								imgUrl:imgs
							}
								}
							]
						
						})
					}
				}
			})
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
		to_vip() {
			uni.navigateTo({
				url: 'vip/vip'
			});
		},
		to_detail(item) {
			uni.navigateTo({
				url: 'hangqing-detail/hangqing-detail'
			});
		},
		choose(item, index) {
			console.log(item);
			this.shaixuan_list[index].is_click = !this.shaixuan_list[index].is_click;
		},
		shaixuan() {
			this.$refs.showRight.open();
		},
		showDrawer() {
			this.$refs.showRight.open();
		},
		closeDrawer() {
			this.$refs.showRight.close();
			console.log('close');
			let l = this.shaixuan_list.filter(re => {
				return re.is_click == true;
			});
			console.log(l);
		},
		choose_img(list, index) {
			uni.previewImage({
				urls: list,
				current: index
			});
		}
	}
};
</script>

<style lang="scss">
.set_box {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
}

/* 左侧时间 */
.set_time {
	width: 10%;
	position: relative;

	view {
		width: 120%;
		position: absolute;
		margin-top: 60upx;
		right: -40rpx;
		color: #999999;
	}
}

/* 右侧内容 */

.set-1 {
	width: 90%;
}

.set-2 {
	min-height: 300upx;
	border-radius: 10upx;
	width: 84%;
	margin-left: 100upx;
	margin-top: 60upx;
	padding-right: 10rpx;
	position: relative;

	.tlak_o {
		width: 100%;
		min-height: 300upx;

		.like_ {
			width: 100%;
			min-height: 100rpx;

			.like_o {
				width: 100%;
				height: 100%;

				.like_h {
					color: #999999;

					.name_ {
						margin-right: 20rpx;
						font-size: 32rpx;
					}

					.time_ {
						font-size: 24rpx;
					}
				}

				.like_talk {
					width: 95%;
					min-height: 100rpx;
					margin: 0 30rpx;

					text {
						color: #333333;
					}

					.like_img {
						width: 100%;
						min-height: 100rpx;
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;

						image {
							width: 30%;
							height: 180rpx;
							margin-bottom: 20rpx;
							margin-right: 2%;
						}
					}
				}
			}
		}
	}
}

.set-2::after {
	content: '';
	/* 必须存在如果没有图标就留空 */
	top: -20upx;
	/* 定位 距离*/
	border-left: #c6c6c6 1px solid;
	/* 横线颜色 */
	left: -44upx;
	/* 定位 距离*/
	height: 120%;
	/* 高度 */
	position: absolute;
	/* 定位 */
}

.set-2::before {
	content: '\e64d';
	/* 必须存在如果没有图标就留空 */
	color: #c6c6c6;
	/* 设置颜色 */
	position: absolute;
	/* 定位 */
	left: -70upx;
	top: -20upx;
	/* 移动到左边 */
	font-weight: bold;
	/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	font-family: 'iconfont' !important;
	/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	font-size: 54upx;
	/* 图标大小 */
	font-style: normal;
	/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	-webkit-font-smoothing: antialiased;
	/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	-moz-osx-font-smoothing: grayscale;
	/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
}

@font-face {
	font-family: 'iconfont';
	src: url('//at.alicdn.com/t/font_1337773_f06f5a7las.eot?t=1565581133395');
	/* IE9 */
	src: url('//at.alicdn.com/t/font_1337773_f06f5a7las.eot?t=1565581133395#iefix') format('embedded-opentype'),
		/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOIAAsAAAAAB8QAAAM7AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqCRIIjATYCJAMUCwwABCAFhG0HZhvNBsiemjwJqJERRCC3tX4YOM4iqNbCnr29uw8wKGBUsUAKqDyCjY5HcEzCALron1wr8wDk8hKBFpIc5yaXfWZJoIBIQkF1KlvVqWuFfZ3c/CBw0p8fcMJJsQY6uIuEMk8188LgXgfHTJceiXlrm0tGajTgaMCz2T6yyf5BXh+Ef9BdxMSIS9cTaKmvYGbzFhRXA1sZ2C0QO7cRAdhadnmkNTSEqufYLM4qNdKx9AJn+M/Hb2OiQVIWwL6rNufIIP1bj29voaZspAiK/byITqLAaEAmdvX6d7KQ+dEstCw2tjQL0FJDkvZald8e//3y+WglCIaW0E/e5R8vERWvuTWY5RYy3/ywXBtKXBEF395EBN++FCQ8V5CWsmEt4CBgHMz1Ad8rde7s2LbD7oUhT3l+eWHbhxwOB+LFrfkVL7I3FIAWdpdWvfHiYt8FltYWdzy1Pz/WfPhQ/elT7efPvUJiVlRsIj8+18X3az7+5Wb48vVrbnvo7OndVe1cPc55k2ebWG7OmMgYX01bT3vJnNlJWtemes0mn3vI/PJl80NQQqVErfcH/Ys5Fy3evrVoyyZNDLSq/cp5EyYsKTbb69bD/+5fmPs/cFwxG9ABoCNdTY+AKrwdi2npHk0Xu4vMH/Q7Wl+4+Yftkv83kMHXTiVutOlsnh68ZYPZit+hmDmRSxVwlDnvxvI8WOq3gz4VCy3xE8Id/d7H2GV2M6Ghi4ak1gcKDYORGTsaSq2Mg0rDTGhplLyTW+mEsRC5BUYadyC0dwpJWw+h0N53ZMb+glJX/6DSPgpoaUN4nLOVobGtZdYuJHAkQ7EbqiVqwMjF7UVrJSKKTmCmitNrETOpUzAiNLxZykMGxPY4wNRBIjnHEDOqh7nOzZBOR6GRUQ2SeKiKc2NiWBju+6JQieqBvbkYRMAhMkjUDVKTUAaYzufsW99fCSEUOgI20rMQr4UwJurloQihwmcg8/SGWT3v8hKTDkQkjsMgjKH0oFzHi+hgnoKM/VtpIBIulGpF1ihRmDcLz9WHnm/Uv0BZNAD40zJSFJGjjEq77dsEg1ahKoF2qbupYvP0KNS2e69WbmucSNZAOpEa5XpUagAAAA==')
			format('woff2'),
		url('//at.alicdn.com/t/font_1337773_f06f5a7las.woff?t=1565581133395') format('woff'),
		url('//at.alicdn.com/t/font_1337773_f06f5a7las.ttf?t=1565581133395') format('truetype'),
		/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */ url('//at.alicdn.com/t/font_1337773_f06f5a7las.svg?t=1565581133395#iconfont') format('svg');
	/* iOS 4.1- */
}

.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-yuandian:before {
	content: '\e64d';
}

.icon-dingweiweizhi:before {
	content: '\e619';
}
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
.top1 {
	width: 100%;
	top: 80px;
	left: 0px;

	position: fixed;
	background-color: #fff;
	z-index: 999;
}
.cover {
	//position:absolute;
	left: 0;
	top: 0;
	background: (0, 0, 0, 0.5);
	width: 100%; //宽度设置为100%，这样才能使遮罩层覆盖原页面
	height: 100%;
	opacity: 0.1; //非IE浏览器下设置透明度为60%
	z-index: 999;
}
</style>
