<template>
	<view>
		<swiper class="card-swiper b-s" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" 
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.fImg" mode="aspectFill"></image>
				
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cardCur: 0,
				dotStyle: false,		
			}
		},
		props:{
			swiperList:Array
		},
		methods:{
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
		}
	}
</script>

<style scoped>
	
</style>
