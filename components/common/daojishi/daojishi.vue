<template>
	<view>
	    <u-count-down
	        :time="day_num"
	        format="DD:HH:mm:ss"
	        autoStart
	        millisecond
	        @change="onChange"
	    >
	        <view class="time">
	            <text class="time__item">{{ timeData.days }}&nbsp;天</text>
	            <text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}&nbsp;时</text>
	            <text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
	            <text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
	        </view>
	    </u-count-down>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeData: {},
			}
		},
		props:{
			day_num:{
				type:Number,
				default:0
			}
		},
		methods: {
			onChange(e) {
			                this.timeData = e
			            }
		}
	}
</script>

<style>

</style>
