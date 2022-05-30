<template>
	<view>
		<view style="height: 40px;"></view>
		<view class="p-10 u-f-dr u-f-ac u-f-jsb" :class="isTop?'top':''">
			<image :src="getImgsrc('wode.png')" mode="aspectFill" class="img_35" @click="wode"></image>
			<view class="">
				<text class="f-b-wb">GaoDing策略</text>
			</view>
			<view></view>
		</view>
		<view class="p-10 bd-r-20" style="margin-top: -15px;"><u-swiper :list="list3" indicator indicatorMode="line" circular height="150px"></u-swiper></view>
		<view class="p-10 u-f u-f-ajc" :class="isTop2?'top1':''">
			<u-sticky bgColor="#ffffff"><u-tabs :list="list4" @click="choose_tab"></u-tabs></u-sticky>
		</view>
	<view class="p-10">
		<block v-for="(item, index) in new_list" :key="index">
			<!-- 多图展示 -->
			<view  class="p-5 bd-b-1" @click="to_news_detail(item)">
				<view class="f-b-wb">
					<text>{{item.fTitle}}</text>
					<view class="u-f-dr u-f-ac  p-5">
						<block v-for="(i,ind) in item.title_imgs" :key="ind">
							<image :src="i.fImg" mode="aspectFill" class="p-2 img_75"></image>
						</block>
					</view>
					<view class="u-f-dr u-f-ac">
						<text class="m-t-5 f-s">{{toTime(item.fTime*1000)}}</text>
						<text class="m-l-10 f-s">关注人数：{{item.fLike_num==0?'暂无':item.fLike_num+'人'}}</text>
					</view>
					
				</view>
			</view>
			<!-- 左文右图 -->
		<!-- 	<view v-if="item.view_type=='左文右图'" class="u-f-dr u-f-ac u-f-jsb">
				<view class="u-f-dc">
					<text class="f-b-wb">{{item.fTitle}}</text>
					<view class="u-f-dr u-f-ac">
						<text class="m-t-5 f-s">{{toTime(item.fTime*1000)}}</text>
						<text class="m-l-10 f-s">关注人数：{{item.fLike_num==0?'无':item.fLike_num}}人</text>
					</view>
				</view>
				<view>
					<block v-for="(i,ind) in item.title_imgs" :key="ind">
						<image :src="i.fImg" mode="aspectFill" class="p-2 img_75"></image>
					</block>
				</view>
			</view> -->
		</block>
		<view v-if="new_list.length==0" class="">
			<u-empty
			        mode="news"
			        icon="http://cdn.uviewui.com/uview/empty/news.png"
			>
			<view class="c-grey">暂无该类目的资讯！</view>
			</u-empty>
		</view>
	</view>	
		
	<tui-modal :show="modal" content="你还没有登陆,请登录!" color="#333" :size="32" :button="buttons" @click="model_click" @cancel="modal_cancel"></tui-modal>
	<zy-update theme="green" :h5preview="true" oldversion="1.0.3" :appstoreflag="false" :updateurl="update_url" :autocheckupdate="true"></zy-update>
	</view>
</template>



<script>
	var _self
	import tuiModal from '@/components/thorui/tui-modal/tui-modal';
	import zyUpdate from '@/components/zy-upgrade/zy-upgrade.vue';
	
	export default {
		data() {
			return {
				update_url:'',
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
				list3:[],
				list4: [],
				new_list:[],
				isTop:false,
				isTop2:false,
				user_uuid:''
			}
		},
		components:{
			zyUpdate,
			tuiModal
		},
		onPageScroll(e) {
			if(e.scrollTop>60){
				this.isTop=true
			}else{
				this.isTop=false
			}
			
			if(e.scrollTop>100){
				this.isTop2=true
			}else{
				this.isTop2=false
			}
		},
		onShow() {
			//uni.removeStorageSync('user_uuid')
		this.user_uuid=this.checkLogin().user_uuid
			if(this.user_uuid){
				console.log(this.user_uuid);
				this.load_news('关注');
			}else{
				this.modal=true
			}
			
		},
		onLoad() {
			this.load_bannar()
			this.load_news_types()
       this.update_url = this.tp_url + 'c_test_update?v=' + this.Config.v;
		},
		methods: {
			to_news_detail(item){
				uni.navigateTo({
					url:'news_detail/news_detail?item='+JSON.stringify(item)
				})
			},
			load_news_types(){
				_self=this
				this.list4=[]
				uni.request({
					url:this.tp_url+'g_load_news_type',
					success(res) {
						for(let i=0;i<res.data.length;i++){
							_self.list4.push({
								uid:res.data[i].uid,
								badge: {
								        isDot:res.data[i].name=='推荐'?true:''
								    },
								name:res.data[i].name
							})
						}
					}
				})
			},
			wode(){
				uni.navigateTo({
					url:'/person/person'
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
		load_bannar() {
			_self = this;
			this.list3 = [];
			uni.request({
				url: this.tp_url + 'g_load_bannar',
				success(res) {
					let l = res.data.data;
					if (l.length > 0) {
						for (let i = 0; i < l.length; i++) {
							_self.list3.push(_self.Config.img_src + l[i].fImg);
						}
					}
				}
			});
		},
		choose_tab(item) {
			console.log(item);
			this.select_id = item.id;
			this.load_news(item.name);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		},
		load_news(cate) {
			_self = this;
			this.new_list = [];
			uni.request({
				url: this.tp_url + 'g_load_news',
				data: {
					cate: cate
				},
				method: 'GET',
				success(res) {
					
						_self.new_list = res.data;
						
					
				}
			});
		},
		}
	}
</script>

<style>
.top{
	width: 100%;
	top: 0px;
	left: 0px;
	height: 80rpx;
	padding-top: 50px;
	position: fixed;
	background-color: #fff;
	z-index: 999;
}
.top1{
	width: 100%;
	top: 80px;
	left: 0px;
	
	position: fixed;
	background-color: #fff;
	z-index: 999;
}
</style>
