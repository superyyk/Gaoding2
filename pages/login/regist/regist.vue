<template>
	<view>
		<view class="u-f u-f-ajc" style="font-size: 24px; font-weight: 600; padding: 10px;">欢迎使用GD策略！</view>
		<view class="u-f-dc u-f-ajc u-f-ac">
			<image src="../../../static/logo.jpg" mode="aspectFill" style="width: 55px;height: 55px; border-radius: 50px;"></image>
			<text>GD注册</text>
		</view>
		<view class="u-f-dc p-10">
			<!-- 手机号 -->
			<view class="u-f-l" style="margin-top:10px;">
				<view class="u-f-dc m-t-10">
					<view class="u-f-dr u-f-ac" style="background-color: #f1f1f1; border-radius: 20px;">
						<view><image src="../../../static/images/shouji002.png" mode="aspectFit" style="width: 20px; height: 35px; margin-left: 12px;"></image></view>
						<view class="m-l-10" style="color: #8170fe; font-size:larger; font-weight: bold; ">
							<input v-model="phoneNum" @input="onKeyInput" type="text" maxlength="20" confirm-type="send" value="" placeholder="手机号/账户名" />
						</view>
					</view>
					<!-- <view class="hr-c-base" style="width: 90%;"></view> -->
				</view>
				<!-- 验证码 -->
				<view class="u-f-dc m-t-10">
					<view class="u-f-dr u-f-ac" style="background-color: #f1f1f1; border-radius: 20px;">
						<view><image src="../../../static/images/yanzhengma002.png" mode="aspectFit" style="width: 20px; height: 35px; margin-left: 12px;"></image></view>
						<view class="m-l-10" style="color: #8170fe; font-size:larger; font-weight: bold;  ">
							<input v-model="password" type="password" maxlength="20" confirm-type="done" value="" placeholder="设置账户密码" />
						</view>
						<!-- 				<view class="yanzheng m-l-10" v-show="show" @click="get_num" :class="[is_text ? 'yanzheng' : 'active_yanzheng']">获取验证码</view>
				<text v-show="!show" class="chongxin m-l-10" >{{ count }}s后重新获取</text> -->
					</view>
					<!-- <view class="hr-c-base" style="width: 90%;"></view> -->
				</view>
				
				<view class="u-f-dc m-t-10">
					<view class="u-f-dr u-f-ac" style="background-color: #f1f1f1; border-radius: 20px;">
						<view><image src="../../../static/images/querenmima.png" mode="aspectFit" style="width: 20px; height: 35px; margin-left: 12px;"></image></view>
						<view class="m-l-10" style="color: #8170fe; font-size:larger; font-weight: bold;  ">
							<input v-model="password1" type="password" maxlength="20" confirm-type="done" value="" placeholder="确认账户密码" />
						</view>
						<!-- 				<view class="yanzheng m-l-10" v-show="show" @click="get_num" :class="[is_text ? 'yanzheng' : 'active_yanzheng']">获取验证码</view>
				<text v-show="!show" class="chongxin m-l-10" >{{ count }}s后重新获取</text> -->
					</view>
					<!-- <view class="hr-c-base" style="width: 90%;"></view> -->
				</view>

				<!-- 	<view class="u-f-dc m-t-10">
			<view class="u-f-dr u-f-ac">
				<view>
					<image src="../../../static/images/yaoqing.png" mode="aspectFit" style="width: 20px; height: 35px;"></image>
				</view>
				<view class="m-l-10" style="color: #8170fe; font-size:larger; font-weight: bold; ">
					<input v-model="yaoqingcode"  type="number" maxlength="11" confirm-type="send" value="" placeholder="邀请码(必填)" />
				</view>
			</view>
			<view class="hr-c-base" style="width: 90%;"></view>
		</view> -->
			</view>
			<view class="u-f-dr p-10 u-f-ac">
				<view><switch checked="true" @change="checked" /></view>
				<text>开启即代表同意</text>
				<text style="color: #007AFF;">《用户注册协议》</text>
			</view>

			<view class="u-f-dc u-f-ajc" style="margin-top: 10px;">
				<view
					style="width: 50%;  color: #FFFFFF; border-radius: 5px; margin-top: 15px; height: 45px;text-align: center; font-size: large; padding: 5px 30px; background-color:#0ab5d8;"
					hover-class="hv-b"
					@click="login"
				>
					注册
				</view>
				<view class="u-f-dr u-f-ac p-8">
					<text style="color: #8B8E8E;">已有GD账户？</text>
					<text style="color: #8170fe;" @click="to_login">去登陆</text>
				</view>
				<text class="f-s m-t-10">备注：如果首次使用手机验证码登陆平台，则默认为注册</text>
			</view>
		</view>
	</view>
</template>

<script>
var _self;
export default {
	data() {
		return {
			height: '',
			yaoqingcode: '',
			width: '',
			backcolor: '#F8F8F8',
			show: true,
			is_text: false,
			phoneNum: '',
			count: 60,
			timer: null,
			res: '',
			code: '',
			code_uid: '',
			tab_list: [
				{
					id: 1,
					title: '验证码登录',
					info_num: 0
				},
				{
					id: 2,
					title: '账号登录',
					info_num: 0
				}
			],
			indexTab: 0,
			name: '',
			password: '',
			password1:''
		};
	},
	onShow() {
	   uni.setNavigationBarTitle({
	   	title:'用户注册'
	   })
	   this.password1=''
	   this.password=''
	   this.phoneNum=''
	},
	methods: {
		to_login() {
			uni.navigateTo({
				url: '../login'
			});
		},
		checked(e) {
			console.log(e.detail.value);
		},
		onKeyInput(e) {
			if (e.target.value.length != 11) {
				this.is_text = false;
			} else {
				this.is_text = true;
			}
		},
		get_num(e) {
			_self = this;
			if (!/^1[3456789]\d{9}$/.test(_self.phoneNum)) {
				uni.showModal({
					title: '消息提示',
					content: '手机号码格式错误!请重新输入',
					success(res) {
						if (res.confirm) {
							_self.phoneNum = '';
						}
					}
				});
			} else {
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000);
				}
				uni.request({
					url: this.tp_url + 'send_sms',
					data: { tel: _self.phoneNum },
					method: 'GET',
					success(res) {
						console.log(res);
						if (res.data.res == 200) {
							_self.code_uid = res.data.uid;
							console.log(_self.code_uid);
							uni.showToast({
								title: '验证码发送成功！'
							});
						}
					},
					fail(error) {
						console.log(error);
					}
				});
			}
		},
		login() {
			_self = this;
			var num = /^(?=.*[0-9].*)(?=.*[a-z].*).{6,20}$/; // 验证是否6位数字
			if (!num.test(this.password)) {
			     uni.showModal({
			     	title:'提示',
					content:'密码又6-20位字母和数字组成！',
					success(re) {
						if(re.confirm){
							_self.password=''
						}
					}
			     })
				 return
			} else {
				//console.log(_self.phoneNum)
				//console.log(_self.code)
				if(this.password==this.password1){
				let user_uuid = this.get_Num(32);
				uni.request({
					url: this.tp_url + 'f_regist_confirm_app',
					data: {
						tel: this.phoneNum,
						password: this.password,
						user_uuid: user_uuid
					},
					method: 'GET',
					success(res) {
						console.log(res.data);
						if (res.data.res == 200) {
							
							uni.showToast({
								title: res.data.msg,
								
							});
							setTimeout(function(){
								uni.navigateTo({
									url: '/pages/login/pass-login/pass-login'
								});
							},1500)
						} else {
							uni.showModal({
								title: '提示',
								content: res.data.msg
							});
							_self.password = '';
						}
					}
				});
				}else{
					uni.showToast({
						title:'两次输入密码不相同，请重新输入！',
						icon:'error'
					})
					this.password1=''
				}
			}
		}
	}
};
</script>

<style></style>
