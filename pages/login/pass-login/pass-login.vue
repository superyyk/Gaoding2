<template>
	<view>

		<image src="../../../static/tony-scroll/back2.png" mode=" aspectFill" style="position: fixed; top: 0px; right: 0px; width: 100%;"></image>
		<view class="u-f u-f-ajc" style="font-size: 24px; font-weight: 600; padding: 10px;">欢迎使用GD策略！</view>
        <view class="u-f-dc u-f-ajc u-f-ac">
			<image src="../../../static/logo.jpg" mode="aspectFill" style="width: 55px;height: 55px; border-radius: 50px;"></image>
			<text>GD登陆</text>
		</view>
		<view class="u-f-dc p-10">
		
		<!-- 手机号 -->
		<view class="u-f-l" style="margin-top: 10px;"> 
		<view class="u-f-dc m-t-10" style="background-color: #fff;">
			<view class="u-f-dr u-f-ac" style="background-color: #f1f1f1; border-radius: 20px;">
				<view>
					<image src="../../../static/images/shouji002.png" mode="aspectFit" style="width: 20px; height: 35px; margin-left: 12px;"></image>
				</view>
				<view class="m-l-10" style="color: #8170fe; font-size:x-large; font-weight: bold; ">
					<input v-model="phoneNum" @input="onKeyInput" type="text" maxlength="11" confirm-type="send" value="" placeholder="手机号/账户名" />
				</view>
			</view>
			<!-- <view class="hr-c-base" style="width: 90%;"></view> -->
		</view>
		<!-- 验证码 -->			
<!-- 		<view class="u-f-dc m-t-10">
			<view class="u-f-dr u-f-ac">
				<view>
					<image src="../../static/images/yanzhengma002.png" mode="aspectFit" style="width: 20px; height: 35px;"></image>
				</view>
				<view class="m-l-10" style="color: #8170fe; font-size:larger; font-weight: bold;  ">
					<input v-model="code" type="number" maxlength="6" confirm-type="done" value="" placeholder="验证码" />
				</view>
				<view class="yanzheng m-l-10" v-show="show" @click="get_num" :class="[is_text ? 'yanzheng' : 'active_yanzheng']">获取验证码</view>
				<text v-show="!show" class="chongxin m-l-10" >{{ count }}s后重新获取</text>
			</view>
			<view class="hr-c-base" style="width: 90%;"></view>
		</view> -->
			<!-- 密码登录 -->		
			<view  class="u-f-dc m-t-10" style="background-color: #fff;">
				<view class="u-f-dr u-f-ac" style="background-color: #f1f1f1; border-radius: 20px;">
					<view>
						<image src="../../../static/images/mima.png" mode="aspectFit" style="width: 20px; height: 35px; margin-left: 12px;"></image>
					</view>
					<view class="m-l-10" style="color: #8170fe; font-size:larger; font-weight: bold; ">
						<input v-model="pass_word"  type="password"  maxlength="20" confirm-type="send" value="" placeholder="登陆密码" />
					</view>
				</view>
				<!-- <view class="hr-c-base" style="width: 90%;"></view> -->
			</view>
			
		</view>
	<!-- 	<view class="u-f u-f-jsb">
			<view></view>
			<view class="p-10">无法获取验证码？<text style="color: #8170fe; border-bottom: 1rpx solid #8170fe;" @click="mima">密码登陆？</text></view>
		</view> -->
		
<!-- 		<view class="u-f-dr p-10 u-f-ac">
			<view>
				<switch checked="true" @change="checked" />
			</view>
			<text>开启即代表同意</text>
			<text style="color: #007AFF;">《用户注册协议》</text>
		</view> -->
		
		<view class="u-f-dc u-f-ajc" style="margin-top: 10px;">
			
<!-- 		<view v-if="is_pass_word==false" style="width: 50%;  color: #FFFFFF; border-radius: 5px; margin-top: 15px; height: 45px;text-align: center; font-size: large; padding: 5px 30px; background-color:#f9710b;" >
			<text   @click="login">立即登录</text>
			</view> -->
			
	<!-- 	<view  style="width: 50%;  color: #FFFFFF; border-radius: 5px; margin-top: 15px; height: 45px;text-align: center; font-size: large; padding: 5px 30px; background-color:#f9710b;"  @click="login_by_password">密码登录</view>	 -->
	<button type="default" @click="login_by_password()" style="background-color:#f9710b ; color: #FFFFFF; width: 150px;">立即登陆</button>
		
		
		<!-- <view class="u-f-dr u-f-ac p-8">
			<text style="color: #8B8E8E;">还没有懒猫账户？</text>
			<text style="color: #8170fe;" @click="regist">立即注册</text>
		</view> -->
		<text class="f-s m-t-10">备注：如果首次使用手机验证码登陆平台，则默认为注册</text>
		</view>
		
		</view>
		<image src="../../../static/tony-scroll/back2.png" mode=" aspectFill" style="position: fixed; bottom: 0px; left: 0px;"></image>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				height:'',
				width:'',
				backcolor:'#F8F8F8',
				show:true,
				is_text:false,
				phoneNum:'',
				count:60,
				timer:null,
				res:'',
				code:'',
				code_uid:'',
				tab_list:[{
					id:1,
					title:'验证码登录',
					info_num:0
				},{
					id:2,
					title:'账号登录',
					info_num:0
				}
				],
				indexTab:0,
				name:'',
				password:'',
				pass_word:'',
				is_pass_word:false,
				
			}
		},
		onLoad() {
		uni.setNavigationBarTitle({
			title:'密码登陆'
		})	
		},
		onNavigationBarButtonTap() {
		uni.navigateTo({
			url:'../regist/regist'
		})	
		},
		methods: {
		
			regist(){
				uni.navigateTo({
					url:'../regist/regist'
				})
			},
			checked(e){
				console.log(e.detail.value);
				
			},
			onKeyInput(e) {
				
				if (e.target.value.length != 11) {
					this.is_text = false
				} else {
					this.is_text = true
				}
			},
			// get_num(e) {
			// 	_self = this;
			// 	this.is_pass_word=false
			// 	if (!/^1[3456789]\d{9}$/.test(_self.phoneNum)) {
			// 		uni.showModal({
			// 			title: '消息提示',
			// 			content: '手机号码格式错误!请重新输入',
			// 			success(res) {
			// 				if (res.confirm) {
			// 					_self.phoneNum = '';
			// 				}
			// 			}
			// 		});
			// 	} else {
			// 		const TIME_COUNT = 60;
			// 		if (!this.timer) {
			// 			this.count = TIME_COUNT;
			// 			this.show = false;
			// 			this.timer = setInterval(() => {
			// 				if (this.count > 0 && this.count <= TIME_COUNT) {
			// 					this.count--;
			// 				} else {
			// 					this.show = true;
			// 					clearInterval(this.timer);
			// 					this.timer = null;
			// 				}
			// 			}, 1000);
			// 		}
			// 		uni.request({
			// 			url: this.Url + 'send_sms',
			// 			data: { tel: _self.phoneNum },
			// 			method: 'GET',
			// 			success(res) {
			// 				console.log(res);
			// 				if(res.data.res==200){
			// 					_self.code_uid=res.data.uid
			// 					console.log(_self.code_uid);
			// 					uni.showToast({
			// 						title:'验证码发送成功！'
			// 					})
			// 				}
			// 			},
			// 			fail(error) {
			// 				console.log(error);
			// 			}
			// 		});
			// 	}
			// },
			// login() {
			// 	_self = this;
				
			// 		var num = /^\d{6}$/; // 验证是否6位数字
			// 	if (!num.test(this.code)) {
			// 		uni.showModal({
			// 			title: '提示',
			// 			content: '验证格式错误！',
			// 			success(res) {
			// 				if (res.confirm) {
			// 					_self.code = '';
			// 				}
			// 			}
			// 		});
			// 	} else {
			// 		//console.log(_self.phoneNum)
			// 		//console.log(_self.code)
					
			// 			uni.request({
			// 			url: this.Url + 'f_login_confirm',
			// 			data: { tel: _self.phoneNum, code: _self.code,code_uid:_self.code_uid },
			// 			method: 'GET',
			// 			success(res) {
			// 				console.log(res.data);
			// 				if (res.data.res == 200) {					
			// 					uni.showToast({
			// 						title:res.data.msg,
			// 						success() {
			// 							try{
			// 								uni.setStorage({
			// 									key: 'user_uuid',
			// 									data: res.data.user_uuid,
			// 									success() {
			// 										console.log('缓存userna成功');
			// 										//全局绑定即时通讯发送者
			// 										setTimeout(function(){
			// 											uni.reLaunch({
			// 									url: '../index/index'
			// 								            });
			// 										},1500)
													
			// 									}
			// 								});
											
											
			// 							}catch(e){
			// 								//TODO handle the exception
			// 							}
										
									
			// 						}
			// 					})
								
							
			// 				} else {
			// 					uni.showModal({
			// 						title: '提示',
			// 						content: res.data.msg
			// 					});
			// 					_self.code=''
			// 				}
			// 			}
			// 		});
					
				
				
					
					
			// 	}
				
				
			// },
			login_by_password(){
				_self=this
				var z=/^1[3456789]\d{9}$/
				// if(this.pass_word.length<6 || !z.test(this.phoneNum)){
				// 	uni.showToast({
				// 		title:'手机号或密码格式错误！',
				// 		icon:'none'
				// 	})
				// 	return
				// }else{
						uni.request({
					url: this.tp_url + 'f_login_by_password_confirm',
					data: { tel: this.phoneNum, password:this.pass_word },
					method: 'GET',
					success(res) {
						console.log(res.data);
						if (res.data.res == 200) {					
							uni.showToast({
								title:res.data.msg,
								success() {
								     try{
										 console.log(res.data);
								     		uni.setStorage({
											key: 'user_uuid',
											data: res.data.user_uuid,
											success() {
												console.log('缓存userna成功');
												//全局绑定即时通讯发送者
												setTimeout(function(){
												uni.reLaunch({
													url:"../../index/index"
												})
												},1500)
											
											}
										});
								     }catch(e){
								     	//TODO handle the exception
								     }
									
					
								}
							})
							
						
							
						
						} else {
							uni.showModal({
								title: '提示',
								content: res.data.msg
							});
							_self.code=''
						}
					}
				});
				//}
			
			}
		}
	}
</script>

<style scoped>
/* .page{
	background: url("../../static/img/222.png");
} */
</style>
