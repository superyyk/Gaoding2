<template>
	<view>
		<view class="p-10 u-f-dc">
			<view class="u-f-dr u-f-ac">
				<text class="c-grey"> 策略标题</text>
				<u--input placeholder="请输入策略标题" border="bottom" clearable v-model="title"></u--input>
			</view>
			<view class=" m-t-5 u-f-dr u-f-ac u-f-jsb bd-b-1" style="height: 40px;" @click="show_(3)">
				<text class="c-grey">策略类型</text>
				<view class="u-f-dr u-f-ac">
					<text>{{ select_d }}</text>
					<image :src="getImgsrc('gengduo.png')" mode="aspectFill" class="img_20"></image>
				</view>
			</view>
			<view class=" m-t-5 u-f-dr u-f-ac u-f-jsb bd-b-1" style="height: 40px;" @click="show_(0)">
				<text class="c-grey">做单信号</text>
				<view class="u-f-dr u-f-ac">
					<text>{{ select_a }}</text>
					<image :src="getImgsrc('gengduo.png')" mode="aspectFill" class="img_20"></image>
				</view>
			</view>
			<view class=" m-t-5 u-f-dr u-f-ac u-f-jsb bd-b-1" style="height: 40px;" @click="show_(1)">
				<text class="c-grey">币种</text>
				<view class="u-f-dr u-f-ac">
					<text>{{ select_b }}</text>
					<image :src="getImgsrc('gengduo.png')" mode="aspectFill" class="img_20"></image>
				</view>
			</view>
			
			<view class=" m-t-5 u-f-dr u-f-ac u-f-jsb bd-b-1" style="height: 40px;" @click="show_(2)">
				<text class="c-grey">做单周期</text>
				<view class="u-f-dr u-f-ac">
					<text>{{ select_c }}</text>
					<image :src="getImgsrc('gengduo.png')" mode="aspectFill" class="img_20"></image>
				</view>
			</view>
			
			<view class=" m-t-5 u-f-dr u-f-ac u-f-jsb bd-b-1" style="height: 40px;">
				<text class="c-grey">仅会员可见</text>
				<view class="u-f-dr u-f-ac">
					<u-switch
						space="2" v-model="is_vip" activeColor="#f9ae3d" 
						inactiveColor="rgb(230, 230, 230)" @change="change_vip">
					</u-switch>
					
				</view>
			</view>
			<view class="u-f-dr u-f-ac u-f-jsb m-t-10">
				<text class="c-grey">开单价格</text>
				<image src="/static/jia.png" mode="aspectFill" class="img_30" @click="add_price"></image>
			</view>
			<block v-for="(item,index) in price_list" :key="index">
				<view class="u-f-dr u-f-ac m-t-5">
				  <u--input
				   :placeholder="`买入价${item.id}`"
				    border="surround"
				    clearable
					type="digit"
					v-model="item.in"
				  ></u--input>
				  <text>—</text>
				    <u--input
				      :placeholder="`卖出价${item.id}`"
				      border="surround"
				      clearable
					  type="digit"
					  v-model="item.out"
				    ></u--input>
			   <image src="../../static/jian.png" mode="aspectFill" class="m-l-10 img_20" @click="jian(item.id)"></image>
			</view>
			</block>
	
			
			<view class="u-f-dr u-f-ac u-f-jsb">
				<text class="c-grey">附加图片</text>
				<text class="f-s">用于展示的图片（最多9张）</text>
			</view>
			<view><upload-image @upload="upload" :maxNum="9"></upload-image></view>

			<view class=" u-f u-f-jsb m-t-5">
				<view class="c-grey">策略具体说明</view>
				<view class="f-s">文字输入</view>
			</view>
				<textarea v-model="content" value="" placeholder="请输入策略具体说明" style="background-color: #FFFFFF; height: 120px; width: 100%; border: 1rpx solid #dbdbdb; border-radius: 10px; padding: 6px;" />
			<!-- 	<view class=" u-f u-f-jsb p-8">
				<view>图片(选填，提供问题截图)</view>
				<view>最多9张</view>
			</view>
			<view><upload-image @upload="upload"></upload-image></view> -->
			<!-- 	<simple-editor :action="uploadUrl" v-model="data.content" :onlyshow="true" :uploadSuccess="editorUploadSuccess"></simple-editor> -->
<!-- 			<ksp-editor ref="editor" @selectImage="selectImage" @save="onsave" :list="content_list"></ksp-editor>
 -->
			<!-- <text class="p-8">联系电话</text>
			<view><input v-model="tel" type="text" value="" placeholder="选填,便于我们与你联系" style="background-color: #FFFFFF; height: 55px;" /></view> -->
			<view v-show="!is_pub" class="u-f u-f-ajc" style="margin-top: 30px;" @tap="submit"><text class="btn" style="width: 80%;">立即发布</text></view>
			<view v-show="is_pub" class="u-f u-f-ajc" style="margin-top: 30px;"><text class="btn" style="width: 80%;">立即发布</text></view>
		</view>
		<u-action-sheet :actions="list_a" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title_a" :show="show_a" @select="selectClick_a"></u-action-sheet>
			<u-action-sheet :actions="list_c" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title_c" :show="show_c" @select="selectClick_c"></u-action-sheet>
			<u-action-sheet :actions="list_d" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title_d" :show="show_d" @select="selectClick_d"></u-action-sheet>
		<!-- <u-action-sheet :actions="list_b" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title_b" :show="show_b" @select="selectClick_b"></u-action-sheet> -->
			<u-modal :show="show_b"  :title="bi_title" @confirm="confirm">
					<view class="slot-content">
						<scroll-view scroll-y="true" style="height: 600rpx; width: 100%;">
							<block v-for="(item,index) in list_b" :key="index">
								<view class="p-8 bd-b-1" style="text-align: center;" :style="{background:select_b==item.name?'#c4df33':''}" @click="choose_bi(item)">{{item.name}}</view>
							</block>
						</scroll-view>
					</view>
				</u-modal>
	</view>
</template>

<script>
var _self;
import uploadImage from '@/components/zrender/upload-image.vue';
//import simpleEditor from '@/components/zhangyuhao-simple-editor/zhangyuhao-simple-editor.vue'
import kspEditor from '@/components/ksp-editor/ksp-editor.vue';
import bi from './bi.json'
export default {
	data() {
		return {
			is_pub: false,
			uploadUrl: '',
			data: {
				content: ''
			},
			image_list: [],
			content: '',
			tel: '',
			uid: '',
			user_uuid: '',
			title: '',
			bi_title:'选择币种',
			list_a: [
				{
					id:0,
					name:'看涨信号'
				},
				{
				    id:1,
					name:"看跌信号"
					
				},
				 {
					 id:2,
					 name:'观察信号'
				 },
				 {
				 					 id:3,
				 					 name:'开单信号'
				 },
				 {
				 					 id:4,
				 					 name:'止盈信号'
				 },
				 {
				 					 id:5,
				 					 name:'止损信号'
				 },
			],
			list_c: [
				{
					id:0,
					name:'短期信号'
				},
				{
				    id:1,
					name:"中期信号"
					
				},
				 {
					 id:2,
					 name:'长期信号'
				 }
			],
			list_b: [],
			list_d: [
				{
					id: 0,
					name: '全部'
				},
				{
					id: 1,
					name: '现货'
				},
				{
					id: 2,
					name: '合约'
				}
			],
			price_list:[
				{
					id:1,
					in:'',
					out:''
				}
			],
			show_a: false,
			show_b: false,
			show_c:false,
			show_d:false,
			title_a: '做单信号',
			title_b: '展示方式',
			title_c:'周期',
			title_d:'策略类型',
			select_a: '',
			select_b: '',
			select_c:'',
			select_d:'',
			content_list: [],
			is_vip:false
		};
	},
	onShow() {
		this.show_a = false;
		this.show_b = false;
		this.list_b=bi
		this.select_b=this.list_b[0].name
		this.select_c=this.list_c[0].name
		this.select_d=this.list_d[0].name
		this.user_uuid = this.checkLogin().user_uuid;
		this.load_news_types();
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '发布新闻'
		});
		this.uid = this.get_Num();
		
	},
	components: {
		uploadImage,
		//simpleEditor
		kspEditor
	},
	methods: {
		change_vip(e){
			console.log(e);
			this.is_vip=e
		},
		add_price(){
			let len=this.price_list.length
			this.price_list.push({
				id:this.price_list[len-1].id+1,
				in:'',
				out:''
				
			})
		},
		jian(id){
			if(this.price_list.length!=1){
					
			for(var i=0;i<this.price_list.length;i++){
			    if (this.price_list[i].id == id){//item.id==122
			　　　　　　this.price_list.splice(i,1)　　 
			       } 
			} 
			}
		
		},
		confirm(){
			this.show_b=false
		},
		choose_bi(item){
			this.select_b=item.name
			this.show_b=false
		},
		load_news_types() {
			_self = this;
			this.select_a=this.list_a[0].name
			// uni.request({
			// 	url: this.tp_url + 'g_load_news_type',
			// 	success(res) {
			// 		for (let i = 0; i < res.data.length; i++) {
			// 			_self.list_a.push({
			// 				uid: res.data[i].uid,
			// 				name: res.data[i].name
			// 			});
			// 		}
			// 	}
			// });
		},
		selectImage() {
			uni.chooseImage({
				count: 1,
				success: res => {
					var path = res.tempFilePaths[0];
					// 实际项目中应上传图片到服务一起，获取url后再添加
					this.$refs.editor.addImage(path);
				}
			});
		},
		onsave(ev) {
			console.log(ev.result);
			this.content_list = ev.result;
		},

		selectClick_a(e) {
			this.show_a = false;
			console.log(e);
			this.select_a = e.name;
		},
		selectClick_b(e) {
			console.log(e);
			this.show_b = false;
			this.select_b = e.name;
		},
		selectClick_c(e) {
			console.log(e);
			this.show_c = false;
			this.select_c = e.name;
		},
		selectClick_d(e) {
			console.log(e);
			this.show_d = false;
			this.select_d = e.name;
		},
		show_(t) {
			switch (t) {
				case 0:
					this.show_a = true;
					break;
				case 1:
					this.show_b = true;
					break;
					
				case 2:
				this.show_c=true
					break;
				case 3:
				this.show_d=true
						break;
				default:
					break;
			}
		},
		upload(e) {
			this.image_list = e;
		},
		async submit() {
			_self = this;
			this.is_pub = true;
			//this.onsave()
			uni.showLoading({
				title:'等待...'
			})
			console.log(this.image_list);
			//console.log(this.content_list);
			if (this.title!= '') {
				for (let k in this.image_list) {
					const re = await this.up_img(this.image_list[k]);
					console.log(re);
				}
				let c = 0;
				for (let k in this.content_list) {
					if (this.content_list[k].type == 'image') {
						const re = await this.up_img(this.content_list[k].url);
						console.log(re);
						if (re.res == 0) {
							this.content_list[k].url = re.data.fImg;
							c++;
						}
					}
				}
				console.log(this.content_list);
				console.log(c);

				uni.request({
					url: this.tp_url + 'g_pub_celue',
					data: {
						content: this.content,
						title: this.title,
						cate: this.select_d,
						sign: this.select_a,
						bi:this.select_b,
						zhouqi:this.select_c,
						uid: this.uid,
						price:JSON.stringify(this.price_list),
						is_vip:this.is_vip,
						user_uuid: this.user_uuid
					},
					method: 'GET',
					success(res) {
						console.log(res.data);
						if (res.data.res == 200) {
							uni.hideLoading()
							uni.showModal({
								title: '发布提示',
								content: res.data.msg,
								success(r) {
									if (r.confirm) {
										uni.navigateBack({
											delta: 1
										});
									}
								}
							});
							_self.is_pub = false;
						}
					}
				});
				_self.is_pub = false;
			} else {
				uni.showToast({
					title: '策略标题不能为空！',
					icon: 'none'
				});
				this.is_pub = false;
				return;
			}
		},
		up_img(url) {
			_self = this;
			let res = '';
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: 'http://47.97.122.25:39007/index.php/index/index/fmr_up_img?username=' + _self.user_uuid + '&uid=' + _self.uid, //仅为示例，非真实的接口地址
					filePath: url,
					name: 'img',
					header: {
						token: uni.getStorageSync('token')
					},
					success: uploadFileRes => {
						resolve(JSON.parse(uploadFileRes.data));
						//console.log(JSON.parse(uploadFileRes.data));
					}
				});
			});
		}
	}
};
</script>

<style></style>
