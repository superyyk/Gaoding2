<template>
	<view>
		<view class="p-20 u-f u-f-ajc" style="">
			<view class="u-f-dc u-f-ac">
				<text class="f-s">剩余应付</text>
				<view class="u-f-dr u-f-ac" style="color:crimson;">
					<text style="margin-top: 5px; padding:5px ;">¥</text>
					<text class="" style="font-size: 32px; font-weight: 900;">{{money |money}}</text>
				</view>
				
			</view>
		</view>
		<view class="p-20 c-grey">请选择付款方式</view>
		<view class="u-f-dc p-10" style="background-color: #FFFFFF">
			 <radio-group @change="radioChange">
			<view class="u-f-dr u-f-ac u-f-jsb bd-b-1">
				<view class="p-5 u-f-ac u-f-dr">
					<image :src="getImgsrc('static/zhifubao.png')" mode="aspectFill" style="width: 40px; height: 40px;"></image>
				<view class="m-l-10 u-f-dc">
					<view class="u-f-dr">
						<text class="f-b-wb">支付宝</text>
						<image class="m-l-8" :src="getImgsrc('static/tuijian.png')" mode="aspectFill" style="width: 40px; height: 15px;"></image>
						</view>
					<view class="f-s">10亿用户都在用，真安全，更放心</view>
				</view>
				</view>
				
				<label class="radio">
					<radio value="0" :checked="current===0" /><text></text>
				</label>
			</view>
			<view class="u-f-dr u-f-ac u-f-jsb">
				<view class="p-5 u-f-ac u-f-dr">
					<image :src="getImgsrc('static/weixin.png')" mode="aspectFill" style="width: 40px; height: 40px;"></image>
				<view class="m-l-10 u-f-dc">
					<view>微信支付</view>
					<view class="f-s">数亿用户都在用，安全可托付</view>
				</view>
				</view>
				
				<label class="radio">
					<radio value="1" :checked="current===1" /><text></text>
				</label>
			</view>
			</radio-group>
		</view>
		<view class="p-20 u-f u-f-ajc" >
			<button type="primary" @click="pay" :style="{background:current==0?'':'green'}">{{current==0?'支付宝':'微信'}}支付 ¥{{money |money}}元</button>
		</view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				money:0,
				current:0,
				list:[],
				type:0,
				user_uuid:'',
				order_uid:'',
				item:''
			}
		},
		onNavigationBarButtonTap() {
		console.log("查看订单");	
		},
		onLoad(e) {
		uni.setNavigationBarTitle({
			title:'GaoDing策略.收银台'
		})	
		//this.item=JSON.parse(e.item)
		this.money=e.price
		this.order_uid=e.order_uid
		console.log(this.order_uid);
		},
		methods: {
			radioChange(evt){
					console.log(evt.target.value);
					this.current=evt.target.value
				},
			
				pay(){
					_self=this
					uni.getProvider({
						service: 'payment', //获取服务供应商
						success: (res) => {
							console.log(res.service); //服务类型：payment
							console.log(res.provider); //不同服务类型下可能的取值：["alipay","wxpay"]
							if (res.provider.indexOf('alipay') != -1) {
								//服务提供商（从服务供应商中获取，是否包含支付宝支付）
								//调取后台接口，获取支付宝支付的订单号
							
								  var re=_self.alipay_Request1()
									//用到的参数 
							
									console.log(JSON.stringify(re))
									// uni.requestPayment({
									// 	provider:this.current==0? 'alipay':'wxpay', //服务提供商（支付宝）（服务提供商，通过uni.getProvider获取）
									// 	orderInfo:re, //后台返回的支付宝订单数据
									// 	success(res) {
									// 		console.log('success:' + res);
									// 	},
									// 	fail(err) {
									// 		console.log('fail:' + err); 
									// 	}
									// });
								
							}
						}
					})
					
					// let orderInfo = 'app_id=2016091654625569&biz_content=shike&charset=utf-8&method=alipay.trade.app.pay&notify_url=http%3A%2F%2F112.74.68.252%3A9200%2Fcssd%2Fapi%2Falipay_notify&out_trade_no=2019052456194799&product_code=QUICK_MSECURITY_PAY&sign_type=RSA2&subject=LV%E5%8C%85%E5%A5%B3%E6%80%A7%E5%A5%A2%E4%BE%88%E5%8C%85&timestamp=2019-05-24+16%3A32%3A27&total_amount=1770.0&version=1.0&sign=R5dwr0XAX42jocM86fIZFTIX5HzzE4U2xBvhU5qWo8hjAO%2F%2FNH4u3XF%2FeCjxtXOVPRTUgPGMbkPBj1pDA2QMmdZk55nBhjb%2FJ0H9kmBFPBek7AwuANZNbU3Lc0keMGxlxJDAadzgaMckiuNXLSkHDAPeI7glR7Yx86FVyqM88V9bEHjIY7e5kfS7f2phU8VmJrAdda32aW49ETgmBMtxPzo1DmzP8r7ovqFu9IAl7MDXYlsUUR4z9%2B9puEtZUe81QI895HD%2FnKN5JiwKhTAcsOXar752NI1j7rJlp%2BVrqejjuXXfvxFmMkWNUXjXWKPGgbQf7uiRJhgfuJp5mJzsEA%3D%3D'
					// uni.requestPayment({
					// 	provider: 'alipay',
					// 	orderInfo: orderInfo, 
					// 	success: function (res) {
							
					// 		console.log('success:' + JSON.stringify(res));
					// 	},
					// 	fail: function (err) {
					// 		console.log('fail:' + JSON.stringify(err));
					// 	}
					// });
					
				
				},
			async	alipay_Request1(){
				_self=this
					var op={
						url:'http://121.43.40.52/fmr/public/index.php/index/index/Alipay_app_gd',
						data:{
							total:this.money
						},
						method:'GET',
						header: {
						'content-type': "application/x-www-form-urlencoded"
								},
					}
					console.log("faqizhifu");
					var re=await this.$alipay_Request(op)
					console.log(re.data);
					var order_info=this.respace(re.data)
					console.log(order_info);
					uni.requestPayment({
						provider:this.current==0? 'alipay':'wxpay', //服务提供商（支付宝）（服务提供商，通过uni.getProvider获取）
						orderInfo:order_info, //后台返回的支付宝订单数据
						success(res_alipay) {
							 //成功。。
							   //          console.log(JSON.stringify(res_alipay));
							   //          console.log(res_alipay);
							   //          console.log(res_alipay.rawdata);
							   //          // 取对象中的rawdata
							   //          let rawData = JSON.parse(res_alipay.rawdata) 
							   //          // 取出result字符串 
							   //          let resultStr = rawData.result 
							   //           // 分号分割，取第0个 
							   //          let resultList = resultStr.split(';')  
							   //          // 将取出来的第0个字符串的最后一位花括号去掉
							   //          let finalRes = resultList[0].substring(0, resultList[0].length - 1) 
							   //            // 正常转义  
							   //          let finalObject = JSON.parse(finalRes)
										// console.log(finalObject);
							   //          // 取出订单号
							   //          let trade_no = finalObject.alipay_trade_app_pay_response.trade_no
							            //输出
							   //          console.log(trade_no);
							   //          if(trade_no.length>0){
											
										// }
										let trade_no=_self.get_Num()
										_self.change_order(_self.order_uid,trade_no)
										
							            //后台修改订单状态
							            // mythis.to_payment();
						},
						fail(err) {
							console.log('fail:' + JSON.stringify(err)); 
						}
					});
				},
				change_order(uid,trade_no){
					uni.request({
						url:this.tp_url+'g_change_order_status',
						data:{
							uid:uid,
							trade_no:trade_no,
							status:1
						},
						success(res) {
							if(res.data.res==200){
								uni.showToast({
									title:res.data.msg,
								})
								setTimeout(function(){
								uni.navigateTo({
									url:'pay-result/pay-result?order_info='+JSON.stringify(res.data.data) 
								})
								},1500)
								
								
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
								setTimeout(function(){
									uni.switchTab({
										url:'/pages/index/index'
									})
								},1500)
							}
						}
					})
				}
		}
	}
</script>

<style>

</style>
