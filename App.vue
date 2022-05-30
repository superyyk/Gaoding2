<script>
	 import Vue from 'vue'
	export default {
	
		 globalData: {
		            // 全局设置状态栏和导航栏高度
		            statusBarH: 0,
		            customBarH: 0,
		        },
		// onLaunch: function() {
		// 	console.log('App Launch')
		// uni.connectSocket({
		// 		url: "wss://ws.sosolx.com/",
		// 		complete: e => {
		// 			console.log('链接' + JSON.stringify(e));
		// 		},
		// 		fail: err => {
		// 			uni.showToast({
		// 				title: err,
		// 				icon: 'none'
		// 			});
		// 		}
		// 	});
			
		// 	uni.onSocketOpen(function(e) {
		// 		console.log('websocket打开' + JSON.stringify(e));
		// 		var m={
		// 			bussinessIds: ["CNY"],
		// 			event: "addChannel",
		// 			requestId: "70cedbba-49f3-477f-98d8-0cc2b25ba1f3",
		// 			subGroupName: "currency_layer_rate_list",
		// 		}
		// 					uni.sendSocketMessage({
		// 						data:JSON.stringify(m),
		// 						success() {
		// 							console.log("cn发送数据");
		// 						}
		// 					})
							
		// 			try {
		// 				var m = { bussinessIds: ['498536'], bussinessType: 6, event: 'addChannel', requestId: '4f7605d6-2166-4785-a3e9-f0c0a683c120', subGroupName: 'pair_kline' };
					
		// 				uni.sendSocketMessage({
		// 					data: JSON.stringify(m),
		// 					success() {
		// 						console.log('发送数据');
		// 					}
		// 				});
		// 			} catch (e) {
		// 				//TODO handle the exception
		// 			}		
			
		// 	});
			
			//  //#ifdef APP-PLUS  
			// 			 var info = plus.push.getClientInfo();
			// 			console.log( JSON.stringify( info ) );
			// 			 /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/  
			// 			plus.push.addEventListener("click", function(msg) {  
			// 						console.log("click:"+JSON.stringify(msg));  
			// 						console.log(msg.payload);  
			// 						console.log(JSON.stringify(msg));  
			// 						//这里可以写跳转业务代码
			// 					}, false);  
			// 						// 监听在线消息事件    
			// 					plus.push.addEventListener("receive", function(msg) {  
			// 						// plus.ui.alert(2);  
			// 							//这里可以写跳转业务代码
			// 						console.log("recevice:"+JSON.stringify(msg))  
			// 			   }, false);  
			
			// 		   //#endif 
	//自定义导航
	//          uni.getSystemInfo({
	//                 success: (e) => {
	//                     // 获取手机状态栏高度
	//                     let statusBar = e.statusBarHeight
	//                     let customBar
	
	//                     // #ifndef MP
	//                     customBar = statusBar + (e.platform == 'android' ? 50 : 45)
	//                     // #endif
	
	//                     // #ifdef MP-WEIXIN
	//                     // 获取胶囊按钮的布局位置信息
	//                     let menu = wx.getMenuButtonBoundingClientRect()
	//                     // 导航栏高度 = 胶囊下距离 + 胶囊上距离 - 状态栏高度
	//                     customBar = menu.bottom + menu.top - statusBar
	//                     // #endif
	
	//                     // #ifdef MP-ALIPAY
	//                     customBar = statusBar + e.titleBarHeight
	//                     // #endif
	
	//                     // 注意：此方法不支持原生Nvue页面
	//                     Vue.prototype.statusBarH = statusBar
	//                     Vue.prototype.customBarH = customBar
	
	//                     // 支持nvue页面写法（兼容H5/小程序/APP/APP-Nvue）
	//                     this.globalData.statusBarH = statusBar
	//                     this.globalData.customBarH = customBar
	//                 }
	//             })
			
			
	//	},
		onShow: function() {
			console.log('App Show')
	       
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './commons/uni.css';
	@import './commons/animate.css';
	@import './commons/common_flex.css';
	@import "uview-ui/index.scss";
	//@import "colorui/main.css";
	//@import "colorui/icon.css"; 
	page{
			background-size: contain; //设置背景大小
			/* background-image:url(static/lan1.png) ; *///设置背景图
			 font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;;
			 font-weight:500;
			 color:#2c2c2c;
			background-color:#ffffff;
			 
			/* 宋体 SimSun
			 
			 黑体 SimHei
			 
			 微软雅黑 Microsoft YaHei
			 
			 微软正黑体 Microsoft JhengHei
			 
			 新宋体 NSimSun
			 
			 新细明体 PMingLiU
			 
			 细明体 MingLiU
			 
			 标楷体 DFKai-SB
			 
			 仿宋 FangSong
			 
			 楷体 KaiTi
			 
			 仿宋_GB2312 FangSong_GB2312
			 
			 楷体_GB2312 KaiTi_GB2312
			 
			 宋体：SimSuncss中中文字体（font-family）的英文名称
			 
			 Mac OS的一些：
			 
			 华文细黑：STHeiti Light [STXihei]
			 
			 华文黑体：STHeiti
			 
			 华文楷体：STKaiti
			 
			 华文宋体：STSong
			 
			 华文仿宋：STFangsong
			 
			 儷黑 Pro：LiHei Pro Medium
			 
			 儷宋 Pro：LiSong Pro Light
			 
			 標楷體：BiauKai
			 
			 蘋果儷中黑：Apple LiGothic Medium
			 
			 蘋果儷細宋：Apple LiSung Light
			 
			 Windows的一些：
			 
			 新細明體：PMingLiU
			 
			 細明體：MingLiU
			 
			 標楷體：DFKai-SB
			 
			 黑体：SimHei
			 
			 新宋体：NSimSun
			 
			 仿宋：FangSong
			 
			 楷体：KaiTi
			 
			 仿宋_GB2312：FangSong_GB2312
			 
			 楷体_GB2312：KaiTi_GB2312
			 
			 微軟正黑體：Microsoft JhengHei
			 
			 微软雅黑体：Microsoft YaHei
			 
			 装Office会生出来的一些：
			 
			 隶书：LiSu
			 
			 幼圆：YouYuan
			 
			 华文细黑：STXihei
			 
			 华文楷体：STKaiti
			 
			 华文宋体：STSong
			 
			 华文中宋：STZhongsong
			 
			 华文仿宋：STFangsong
			 
			 方正舒体：FZShuTi
			 
			 方正姚体：FZYaoti
			 
			 华文彩云：STCaiyun
			 
			 华文琥珀：STHupo
			 
			 华文隶书：STLiti
			 
			 华文行楷：STXingkai
			 
			 华文新魏：STXinwei
			 
			 font-family,好看常用的字体
			 
			 转载自http://www.zreading.cn/ican/2014/10/css-font-family/
			 
			 例1（小米米官网）：font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
			 
			 例2（淘宝技术研发中心）：font: 12px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif;
			 
			 例3（加网 ）：font: 14px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
			 
			 例4（淘宝UED）：font: 12px/1 Tahoma,Helvetica,Arial,"\5b8b\4f53",sans-serif;
			 
			 例5（一淘UX）:font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif; */
			 
			
			 
		}
</style>
