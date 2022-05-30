<template>
	<view>
		<view class="u-f-dr u-f-ac bd-b-1 m-t-10" hover-class="bubble" style="width: 100%;">
			<view style="width: 20%;"><image :src="getImgsrc('car1.png')" mode="aspectFit" style="width: 55px; height: 55px;"></image></view>
			<view class="u-f-dc p-l-10" style="width: 80%;">
				<view class="u-f-dr u-f-ac u-f-jsb">
					<view class="u-f-dr u-f-ac">
						<view class="bd-r-5" style="padding: 0px 3px;border: 1rpx solid #ED1C24; color: #ED1C24; font-size: xx-small;">特级认证</view>
						<text class="f-b-w6 m-l-5">杭州滨江</text>
					</view>
		
					<view class="u-f-dr u-f-ac">
						<image :src="getImgsrc('daohang.png')" mode="aspectFill" class="img_15"></image>
						<text class="c-grey m-l-5">2.31km</text>
					</view>
				</view>
				<view class="u-f-dr u-f-ac">
					<u-tag text="★4.89" plain size="mini" type="error"></u-tag>
					<text class="m-l-5" style="">3009单</text>
				</view>
				<view class="u-f-dr u-f-ac u-f-jsb">
					<view class="u-f-dr u-f-ac">
						<image :src="getImgsrc('shizhong.png')" mode="aspectFill" class="img_15"></image>
						<text class="m-l-8" style="color: #DBDBDB;">接单时间：8:00-22:00</text>
					</view>
					<!-- <view class="bd-r-10 b-s-4" hover-class="" style="padding: 0px 10px; color: #FFFFFF; background-color: #ED1C24; font-size: x-small;">立即下单</view> -->
				</view>
		
				<view class="u-f-dr u-f-ac">
					<image :src="getImgsrc('dingwei.png')" mode="aspectFill" class="img_15"></image>
					<text class="m-l-8" style="font-size: small;">浙江省杭州市萧山区瓜沥镇金满府小区</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"liebiao",
		props: {
		  visible: {
		    type: Boolean,
		    default: false,
		    required: true,
		  },
		  title: {
		    type: String,
		    default: '有效算力',
		  },
		  comfirmValue:{
			  type:String,
			  default:'确认'
		  },
		  placeholder: {
		    type: String,
		    default: '请输入内容',
		  },
		  mainColor: {
		    type: String,
		    default: '#e74a39',
		  },
		  defaultValue: {
		    type: String,
		    default: '',
		  },
		  inputStyle: {
		    type: String,
		    default: '',
		  },
		  // 是否多行输入的textarea
		  isMutipleLine: {
		    type: Boolean,
		    default: false,
		  }
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
