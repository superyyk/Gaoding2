<template>
	<view>
		<view class="u-f-dc p-10">
			<text class="f-b-wb">{{info.fTitle}}</text>
			<view class="u-f-dr u-f-ac  p-5">
				<block v-for="(i,ind) in info.title_imgs" :key="ind">
					<image :src="i.fImg" mode="aspectFill" class="p-2 img_75"></image>
				</block>
			</view>
			<view class="f-s u-f-dr u-f-ac">
				<text>{{hideTel(info.publisher.fTel)}}</text>
				<text class="m-l-10">{{toTime(info.fTime)}}</text>
			</view>
			<view>
				<block v-for="(item,index) in content " :key='index'>
					<view>{{item.type=="text"?item.content:''}}</view>
					<image v-if="item.type=='image'" :src="item.url" mode="widthFix" style="width: 100%; height: 200px"></image>
				</block>
			</view>
			<view class="p-10 f-s">浏览{{info.fLike_num}}次数</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:'',
				content:''
			}
		},
		onLoad(e) {
			this.info=JSON.parse(e.item)
			console.log(this.info );
			this.content=JSON.parse(this.info.fContent)
			console.log(this.content);
			this.change_num(this.info.fUid)
			uni.setNavigationBarTitle({
				title:'资讯详情'
			})
		},
		methods: {
			change_num(id){
				uni.request({
					url:this.tp_url+'g_change_num',
					data:{
						id:id
					},
					success(res) {
						console.log(res.data);
					}
				})
			}
		}
	}
</script>

<style>

</style>
