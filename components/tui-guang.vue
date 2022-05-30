<template>
	<view>
		<view class="">
			<view class="f-b-wb m-l-8">推广收益：</view>
			<view class="p-10">
				<view class="p-5 bd-r-5 u-f-dc" style="background-color: #00BFFF; color: #FFFFFF;">
					<view class="u-f-dr u-f-jsb">
						<view class="m-l-8">总推广奖励（TT）</view>
						<view class="u-f-dr u-f-ac" @tap="zhuan_jinbi">
							<text>划转到金币</text>
							<image src="../static/images/gengduo.png" mode="aspectFill" style="width: 20px; height: 20px;"></image>
						</view>
					</view>
					<view class="u-f-dr">
						<text style="font-size: 30px; font-weight: 500;">{{ shouyi | money }}</text>
						<text style="color: #FFFFFF; margin: 5px;">TT</text>
					</view>
						<view class="u-f-dr u-f-jsb u-f-ac" style="padding: 5px; color: #FFFFFF;">
							<text style="font-weight: 800;" @tap="to_dengji">代理等级：{{leval==0 ? '普通会员' : leval==1 ? '市代' :leval==2 ? '省代' : '总代' }}</text>
							<text>可换算成：{{shouyi*5000 |money}}金币</text>
							</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'tui-guang',
		props:{
			shouyi:{
				type:Number,
				default:'200'
			},
			leval:{
				type:Number,
				default:'1'
			}
			
		},
		data() {
			return {
				
			}
		},
		
		methods: {
			zhuan_jinbi(){
				this.$emit('zhuan_jinbi')
			},
			to_dengji(){
				this.$emit('to_dengji')
			}
		}
	}
</script>

<style>

</style>
