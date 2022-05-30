<template>
	<view>
		<view v-if="item1.order.length > 0" class="p-15 u-f-dr u-f-w " style="width: 100%;">
			<block v-for="(item2, index2) in item1.order" :key="index2">
				<view class="u-f-dc" style="width: 33%;">
					<view style="position: relative;">
						<view
							style="position:absolute; top: 0px; right: 20px; z-index: 999; padding: 2px; background-color: red;color: #FFFFFF; border-radius: 100px; font-size: small;"
						>
							{{ item2.fNum }}组
						</view>
						<image :src="item2.fBig_img" mode="widthFix" style="width: 50%;"></image>
					</view>
					<view class="f-b-wb">套餐：{{ item2.fClass }}</view>
					<view class="f-s">算力:{{ item2.fSuanli }}T</view>
					<view class="f-s">额外:{{ item2.fOther_Suanli }}T</view>
					<view>
						价钱:
						<text class="f-c-base">￥{{ item2.fPrice }}</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	
</script>

<style>
	
</style>
