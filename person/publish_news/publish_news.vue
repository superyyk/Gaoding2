<template>
	<view>
		<view class="p-10 u-f-dc">
			<view class="u-f-dr u-f-ac">
				<text>新闻标题</text>
				<u--input placeholder="请输入新闻标题" border="bottom" clearable v-model="title"></u--input>
			</view>
			<view class=" m-t-5 u-f-dr u-f-ac u-f-jsb bd-b-1" style="height: 40px;" @click="show_(0)">
				<text>类型</text>
				<view class="u-f-dr u-f-ac">
					<text>{{ select_a }}</text>
					<image :src="getImgsrc('gengduo.png')" mode="aspectFill" class="img_20"></image>
				</view>
			</view>
			<view class=" m-t-5 u-f-dr u-f-ac u-f-jsb bd-b-1" style="height: 40px;" @click="show_(1)">
				<text>展示方式</text>
				<view class="u-f-dr u-f-ac">
					<text>{{ select_b }}</text>
					<image :src="getImgsrc('gengduo.png')" mode="aspectFill" class="img_20"></image>
				</view>
			</view>
			<view class="u-f-dr u-f-ac u-f-jsb">
				<text>标题图片</text>
				<text class="f-s">用于标题展示的图片（最多3张）</text>
			</view>
			<view><upload-image @upload="upload" :maxNum="3"></upload-image></view>

			<view class=" u-f u-f-jsb m-t-5">
				<view>新闻内容</view>
				<view class="f-s">图文输入</view>
			</view>
			<!-- 	<textarea v-model="content" value="" placeholder="请填写新闻内容" style="background-color: #FFFFFF; height: 120px; width: 100%; border: 1rpx solid #dbdbdb; border-radius: 10px; padding: 6px;" /> -->
			<!-- 	<view class=" u-f u-f-jsb p-8">
				<view>图片(选填，提供问题截图)</view>
				<view>最多9张</view>
			</view>
			<view><upload-image @upload="upload"></upload-image></view> -->
			<!-- 	<simple-editor :action="uploadUrl" v-model="data.content" :onlyshow="true" :uploadSuccess="editorUploadSuccess"></simple-editor> -->
			<ksp-editor ref="editor" @selectImage="selectImage" @save="onsave" :list="content_list"></ksp-editor>

			<!-- <text class="p-8">联系电话</text>
			<view><input v-model="tel" type="text" value="" placeholder="选填,便于我们与你联系" style="background-color: #FFFFFF; height: 55px;" /></view> -->
			<view v-show="!is_pub" class="u-f u-f-ajc" style="margin-top: 30px;" @tap="submit"><text class="btn" style="width: 80%;">立即发布</text></view>
			<view v-show="is_pub" class="u-f u-f-ajc" style="margin-top: 30px;"><text class="btn" style="width: 80%;">立即发布</text></view>
		</view>
		<u-action-sheet :actions="list_a" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title_a" :show="show_a" @select="selectClick_a"></u-action-sheet>
		<u-action-sheet :actions="list_b" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title_b" :show="show_b" @select="selectClick_b"></u-action-sheet>
	</view>
</template>

<script>
var _self;
import uploadImage from '@/components/zrender/upload-image.vue';
//import simpleEditor from '@/components/zhangyuhao-simple-editor/zhangyuhao-simple-editor.vue'
import kspEditor from '@/components/ksp-editor/ksp-editor.vue';
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
			title: '标题',
			list_a: [],
			list_b: [
				{
					id: 0,
					name: '上文下图'
				},
				{
					id: 1,
					name: '左文右图'
				},
				{
					id: 2,
					name: '左图右文'
				},
				{
					id: 3,
					name: '多图展示'
				}
			],
			show_a: false,
			show_b: false,
			title_a: '新闻类型',
			title_b: '展示方式',
			select_a: '关注',
			select_b: '左文右图',
			content_list: []
		};
	},
	onShow() {
		this.show_a = false;
		this.show_b = false;
		this.load_news_types();
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '发布新闻'
		});
		this.uid = this.get_Num();
		this.user_uuid = this.checkLogin().user_uuid;
	},
	components: {
		uploadImage,
		//simpleEditor
		kspEditor
	},
	methods: {
		load_news_types() {
			_self = this;
			this.list_a = [];
			uni.request({
				url: this.tp_url + 'g_load_news_type',
				success(res) {
					for (let i = 0; i < res.data.length; i++) {
						_self.list_a.push({
							uid: res.data[i].uid,
							name: res.data[i].name
						});
					}
				}
			});
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
		show_(t) {
			switch (t) {
				case 0:
					this.show_a = true;
					break;
				case 1:
					this.show_b = true;
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
			if (this.content_list.length != 0) {
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
					url: this.tp_url + 'g_pub_news',
					data: {
						content: JSON.stringify(this.content_list),
						title: this.title,
						cate: this.select_a,
						type: this.select_b,
						uid: this.uid,
						title_img_uid: this.uid,
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
					title: '发布之前须点击保存编辑！',
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
