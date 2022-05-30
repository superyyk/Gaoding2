import Vue from 'vue'
import App from './App'
import money from 'components/money-change.js'
import G_show_modal from 'components/g-gShowModal/common/G_show_modal/index.js'
// import MD5 from 'components/md5/md5.js'
Vue.config.productionTip = false
import store from 'components/stores/store.js'

//导航
import navBar from "components/zhouWei-navBar/zhouWei-navBar.vue"
Vue.component("nav-bar",navBar);

import uView from "uview-ui";
Vue.use(uView);

Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})

//全局后端请求URL
Vue.prototype.Url = 'http://47.97.122.25:4000/';
Vue.prototype.tp_url="http://47.97.122.25:39007/index.php/index/index/";

//app配置
Vue.prototype.Config={
	app_name:"GD策略分析",
	cn_name:"GaoDing策略分析",
	en_name:'GAODING',
	logo:"http://116.62.20.7/lcat/public/GD/logo.png",
	admin_address:'admin00000000001',
	channel:'GD',
	v:2,
	img_src:'http://47.97.122.25:39007/images/'
	}
//获取图片地址
Vue.prototype.getImgsrc=function(src){
	return 'http://47.97.122.25:39007/images/'+src
	//return 'http://118.31.33.100/tp5/public/sc_images/images/'+src
}	


//订单状态
Vue.prototype.get_order_status=function(status){
	let t=status
	var str=''
	switch (t){
		case 0:
		str="下单成功，待支付...."
			break;
		case 1:
		str="开通成功！"
			break;
		case 11:
		str="申请已取消，退款中..."	
		case 10:
		str="已接单，洗车工在赶来的路上...."
			break;	
		case 2:
		str="洗车工人，正在洗车中..."
			break;
		case 3:
		str="已结束洗车，待评价"
			break;
		case 4:
		str="订单已完成"
			break;				
		default:
			break;
	}
	
	return str
}

//用户等级
Vue.prototype.get_user_lev_color=function(lev){
	let t=lev
	var str=''
	switch (t){
		case 1:
		str="#79482f"
			break;
		case 2:
		str="#afafaf"
			break;
		case 3:
		str="#ce8704"
			break;
		case 4:
		str="#5a0772"
			break;		
			
		default:
			break;
	}
	
	return str
}
//用户等级
Vue.prototype.get_user_lev_img=function(lev){
	let t=lev
	var str=''
	switch (t){
		case 1:
		str="普通.png"
			break;
		case 2:
		str="中级.png"
			break;
		case 3:
		str="高级.png"
			break;
		case 4:
		str="特级.png"
			break;		
			
		default:
			break;
	}
	
	return str
}

//订单状态图片
Vue.prototype.get_order_status_img=function(status){
	let t=status
	var str=''
	switch (t){
		case 0:
		str="待付款.png"
			break;
		case 1:
		str="成功.png"
			break;
		case 11:
		str="退款中.png"
			break;
		case 10:
		str="已接单.png"
			break;		
		case 2:
		str="洗车中.png"
			break;
		case 3:
		str="待评价.png"
			break;
		case 4:
		str="已结束.png"
			break;				
		default:
			break;
	}
	
	return str
}

//订单状态说明
Vue.prototype.get_order_status_tip=function(status){
	let t=status
	var str=''
	switch (t){
		case 0:
		str="请在下单申请后30分钟内完成付款，否则订单自定取消！"
			break;
		case 1:
		str="您已成功开通VIP会员！并享有"
			break;
		case 11:
		str="您已提交退款申请，取消本次开通VIP会员服务，我们将在24小时内退还洗车费用！"
			break;
		case 10:
		str="洗车工人正在赶来的路上，请保耐心等待并持电话畅通！"
			break;		
		case 2:
		str="洗车工人正在洗车中...."
			break;
		case 3:
		str="洗车完毕，就本次洗车服务，期待您的5星好评！"
			break;
		case 4:
		str="本次洗车服务已完成，期待您的下次预约洗车！"
			break;				
		default:
			break;
	}
	
	return str
}


	
	//支付宝网络请求API
	Vue.prototype.$alipay_Request = function(options) {
		const base_url = ''
		return new Promise((resolve, reject) => {
			uni.request({
				url: options.url,
				data: options.data || {},
				method: options.method || 'GET',
			header:options.header || {},
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	
	}
	
	/*去掉空格符*/
	Vue.prototype.respace=function(value) {
	       var value = String(value);
	       if(value.indexOf("amp") != -1){
	           value = value.replace(/&amp;/ig, "&");
	       }
	       return value;
	   }

//挂载全局显示/隐藏请求加载动画
// function showLoading() {
// 	store.commit('request_show_loading');
// }
//全局封装外网网络请求API
Vue.prototype.$my_Request_out = function(options) {

	return new Promise((resolve, reject) => {
		uni.request({
			url: options.url,
			data: options.data || {},
			method: options.method || 'GET',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})

}
//全局封装网络请求API
Vue.prototype.$my_Request = function(options) {
	const base_url = 'http://121.43.40.52/fmr/public/index.php/car_api/index/'
	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + options.url,
			data: options.data || {},
			method: options.method || 'GET',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})

}
//全局封装网络请求API
Vue.prototype.$Request = function(options) {
	
	return new Promise((resolve, reject) => {
		uni.request({
			url: options.url,
			data: options.data || {},
			method: options.method || 'GET',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})

}

//浮点相加
Vue.prototype.addNum=function(num1, num2) {
 var sq1,sq2,m;
 try {
  sq1 = num1.toString().split(".")[1].length;
 }
 catch (e) {
  sq1 = 0;
 }
 try {
  sq2 = num2.toString().split(".")[1].length;
 }
 catch (e) {
  sq2 = 0;
 }
 m = Math.pow(10,Math.max(sq1, sq2));
 return (num1 * m + num2 * m) / m;
}

//月日
Vue.prototype.getDate =function (time) {
    let myDate = time ? new Date(time) : new Date();
    let y = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    let m = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    m = m > 9 ? m : `0${m}`;
    let d = myDate.getDate();        //获取当前日(1-31)
    d = d > 9 ? d : `0${d}`;
    return `${m}-${d}`
}
// 年月日
Vue.prototype.getDate_1 = function(time) {
    let myDate = time ? new Date(time) : new Date();
    let y = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    let m = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    m = m > 9 ? m : `0${m}`;
    let d = myDate.getDate();        //获取当前日(1-31)
    d = d > 9 ? d : `0${d}`;
    return `${m}-${d}`
}

//字符串中间隐藏
/* 部分隐藏处理
** str 需要处理的字符串
** frontLen 保留的前几位
** endLen 保留的后几位
** cha 替换的字符串
*/
Vue.prototype.hide_str=function(str, frontLen, endLen,cha) {
  var len = str.length - frontLen - endLen;
  var xing = '';
  for (var i = 0; i < len; i++) {
    xing += cha;
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
};



//数组去重
Vue.prototype.Quchong= function(arr){            
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i].fDate==arr[j].fDate){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j,1);
                    j--;
                }
            }
        }
return arr;
}

//冒泡排序
// Vue.prototype.Up_arr=function(arr){
// 	let temp;
// 	for(let i=0;i<arr.length-1;i++){
// 		for(let j=0;j<arr.leng){
			
// 		}
// 	}
// }



//判断数组中是否存在某个数
Vue.prototype.Is_ex=function(arr,key,value){
	var count=0
	if(arr.length>0){
		for(let i=0;i<arr.length;i++){
			if(arr[i][key]==value){
				count++
			}
		}
	}
	return count
}


//金钱
Vue.prototype.money = function(number,decimals){
　　 number = (number + '').replace(/[^0-9+-Ee.]/g, '');
　　 var n = !isFinite(+number) ? 0 : +number,
　　 prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
 　　sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
 　　dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
 　　s = '',
　　 toFixedFix = function(n, prec) {
 　　　　var k = Math.pow(10, prec);
 　　　　return '' + Math.ceil(n * k) / k;
 　　};

 　　s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
　　 var re = /(-?\d+)(\d{3})/;
　　 while(re.test(s[0])) {
 　　　　s[0] = s[0].replace(re, "$1" + sep + "$2");
 　　}

 　　if((s[1] || '').length < prec) {
    　　 s[1] = s[1] || '';
     　　s[1] += new Array(prec - s[1].length + 1).join('0');
 　　}
  　　　　return s.join(dec);
}

//发送通知
Vue.prototype.$send_notice=function(group,user_uuid,type,data){
	return new Promise((resolve,reject)=>{
			uni.request({
		url:"http://47.97.122.25:4000/send_to_user",
		data:{
			group:group,
			user_uuid:user_uuid,
			type:type,
			data:data
		},
		method:'GET',
		success:(res) => {
				resolve(res)
				console.log(res.data);
				console.log("提示成功");
			},
			fail: (err) => {
				reject(err)
			}
	})
	
	})

}
//互转通知

//提现，提币通知
//身份审核通知


//同一天判断
Vue.prototype.One_day=function(t){
	return new Date(t).toDateString() === new Date().toDateString();
}

// function hideLoading() {
// 	store.commit('request_hide_loading');
// }
// Vue.prototype.$showLoading = showLoading; //全局显示动画可以 this.$showLoading();
// Vue.prototype.$hideLoading = hideLoading; //全局隐藏动画可以 this.$hideLoading();

Vue.prototype.$showModal = function(op = {}) {
	return new Promise((resolve, reject) => {
		new G_show_modal({
			...op,
			$event: function(e) {
				if (e.res) {
					resolve(e);
				} else {
					reject(e);
				}
			}
		}).show();
	})
}

//距离天数
Vue.prototype.level_date=function(date1,date2){
	  const date1_timeStamp = date1
	  const date2_timeStamp = date2
   let max = '', min = ''
   if(date1_timeStamp>date2_timeStamp){
     max = date1_timeStamp
     min = date2_timeStamp
   }else{
     max = date2_timeStamp
     min = date1_timeStamp
   }
  // 例如返回:'1'
  return Math.floor((max-min)/(24*60*60*1000)) 
}

// 计算两个日期距离的天数
// function getDistanceDays(date1,date2){
//   // date1例如:'2022-03-05',date2例如:'2022-03-06'
//   const date1_timeStamp = toTimeStamp(date1)
//   const date2_timeStamp = toTimeStamp(date2)
//   let max = '', min = ''
//   if(date1_timeStamp>date2_timeStamp){
//     max = date1_timeStamp
//     min = date2_timeStamp
//   }else{
//     max = date2_timeStamp
//     min = date1_timeStamp
//   }
//  // 例如返回:'1'
//  return (max-min)/(24*60*60*1000)
// }

//总释放
Vue.prototype.shifang_75=function(arr){
	
	let b=arr
	let sum=0

	if(b.length>0){
		for(let i=0;i<b.length;i++){
			if(b[i].tianshu<180){
				var a=((b[i].fFil_num+b[i].fChild_ticheng)*0.75/180) 
				var v=this.sss(a,4)
				sum+=b[i].tianshu*(v)
				//sum=sum.substring(0,8)
			}else{
				sum+=(b[i].fFil_num+b[i].fChild_ticheng)*0.75
			}
		}	

	}else{
		sum=0
	}

	return sum

}

Vue.prototype.shifang=function(fenpei_detail){
	
	let b=fenpei_detail
	let sum=0
	
    if(b.length>0){
		for(let i=0;i<b.length;i++){
			
			if(b[i].tianshu>180){
				sum+=b[i].fFil_num*0.75
			}
				var a=((b[i].fFil_num)*0.75/180)
				var v=this.sss(a,4)
				sum+=b[i].tianshu*(v)
			
		}
	}

	return sum
}


Vue.prototype.sss=function (num,decimal){
        num = num.toString();
        let index = num.indexOf('.');
                if(index !== -1){
                    num = num.substring(0,decimal + index + 1)
                }else{
                    num = num.substring(0)
                }
                return parseFloat(num).toFixed(decimal) 
    }


  





//25%释放
Vue.prototype.shifang_25=function(arr){
	
	var b=arr
	var sum=0
	if(b.length>0){
		for(let i=0;i<b.length;i++){
			var c=((b[i].fFil_num+b[i].fChild_ticheng)*0.25)
			//sum+=this.sss(c,4)
			sum+=c
			
		}
	}else{
		sum=0
	}
   
	return sum.toFixed(4)
}

//收益提成计算
Vue.prototype.tuiguang_shouyi=function(num){
	var shouyi=0
	if(num>=1 && num<199){
		shouyi=num*0.12
	}else if(num>=200 && num<=1000){
		shouyi=num*0.2
	}else if(num>1000){
		shouyi=num*0.23
	}

	return shouyi;
	
}

//小数点后两位
Vue.prototype.Numfilter=function(value){
	
	    let realVal = ''
	    if (!isNaN(value) && value!== '') {
	      // 截取当前数据到小数点后两位
	      realVal = parseFloat(value).toFixed(4)
	    } else {
	      realVal = '0.00'
	    }
	    return realVal
	  

}

//小数点后两位
Vue.prototype.Numfilter_n=function(value,n){
	
	    let realVal = ''
	    if (!isNaN(value) && value!== '') {
	      // 截取当前数据到小数点后两位
	      realVal = parseFloat(value).toFixed(n)
	    } else {
	      realVal = '0.00'
	    }
	    return realVal
	  

}
//会员
Vue.prototype.huiyuan=function(count,zhitui,zhitui_num){
	var ticheng=0
	var huiyuan=0
	var fenhong=0
	if(count>=6){
		if(zhitui>=5 && zhitui_num<2){
			ticheng=zhitui*0.1
			huiyuan=0
		}
	} 
	if(count>=200){
		
		if(zhitui>=80  && zhitui_num>=2){
			ticheng=(zhitui-80)*0.15+80*0.1
			huiyuan=1
		}
		
	} 
	if(count>=1000){
		if(zhitui>=500  && zhitui_num>=2){
			ticheng=(zhitui-500)*0.2+500*0.15
			huiyuan=2
		}
		
	}
    if(count*5000>=10000000 && zhitui>=1000 && zhitui_num>=2){
		fenhong=0.01
		huiyuan=3
	}
	if(count*5000>=20000000 && zhitui>=1000 && zhitui_num>=2){
		fenhong=0.02
		huiyuan=4
	}
	if(count*5000>=200000000 && zhitui>=1000 &&zhitui_num>2){
		fenhong=0.03
		huiyuan=5
	}
	var arr=[]
	arr.push({
		ticheng:ticheng,
		huiyuan:huiyuan,
		fenhong:fenhong
	})
	
	return arr
	
}
//等级
Vue.prototype.dengji_ticheng=function(next,num){
	var ticheng=0
	if(next.length>0){
		if(num==1){
		ticheng=this.get_next(next)*0.1
	}
	if(num==2){
		ticheng=this.get_next(next)*0.05
	}
	if(num==3){
		ticheng=this.get_next(next)*0.03
	}
	}
	
	return ticheng
}


//创收
Vue.prototype.chuangshou=function(arr,dengji,time){
	var a=arr
	var d=dengji
	var d_time=time
	// if(a.length>0){
	// 	for(let i=0;i<a.length;i++){
	// 		if(a[i].fTime<=d_time && a[i].fHuiyuan<){
				
	// 		}
	// 	}
	// }
}

//获取递归
Vue.prototype.get_tree=function(tuiguang){
	var a=tuiguang
	var count=0
	var _self=this
	if(a.length>0){
		for(let i=0;i<a.length;i++){
		  	count+=a[i].T_count
			
			if(a[i].next.length>0){
				count+=_self.get_next(a[i].next,count)
			}
		}
	}
	return count;
}

//获取下级
Vue.prototype.get_next=function(next){
	var _self=this
	var count=0
	if(next.length>0){
		for(let i=0;i<next.length;i++){
			count+=next[i].T_count
			if(next[i].next.length>0){
				count+=_self.get_next(next[i].next,count)
			}
			
		}
	}
	return count;
}
//推广递归
//获取下级
Vue.prototype.get_next_tuiguang=function(tuiguang){
	var _self=this
	var count=0
	if(tuiguang>0){
		for(let i=0;i<tuiguang.length;i++){
			count+=tuiguang[i].T_count
			if(tuiguang[i].tuiguang.length>0){
				count+=_self.get_next_tuiguang(tuiguang[i].tuiguang,count)
			}
			
		}
	}
	return count;
}



//json数组排序
Vue.prototype.sortArrayByKey=function(ary,key){
	return ary.sort(function (a, b) {
	    let  y=parseFloat(a.user[key]) 
	    let  x=parseFloat(b.user[key]) 
	    return ((x < y) ? -1 : (x > y) ? 1 : 0)
	  })

}
//新闻随机数
Vue.prototype.Rand_news=function(){
	let m=12474;
	let n=14255
	let num=Math.floor(Math.random()*(n-m))+m;
	return num;
}

//生成32位随机数
Vue.prototype.get_Num = function() {
	var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
		'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
		'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	];
	var nums = "";
	for (var i = 0; i < 32; i++) {
		var id = parseInt(Math.random() * 61);
		nums += chars[id];
	}
	return nums;

}
//隐藏手机号
Vue.prototype.hideTel = function(tel) {
	let phoneArray = [...tel];

	var str = " ";
	phoneArray.map((res, index) => {
		if (index > 2 && index < 7) {
			str += '*'
		} else {
			str += res
		}
	})
	return str
}

//收益数组降序
Vue.prototype.sortByKeyDown=function(ary,key){
	return ary.sort(function (a, b) {
	    let  y= a[key]
	    let  x= b[key]
	    return ((x < y) ? -1 : (x > y) ? 1 : 0)
	  })

}

//收益数组降序
Vue.prototype.sortByKey=function(ary,key){
	return ary.sort(function (a, b) {
	    let  y= a[key]
	    let  x= b[key]
	    return ((x < y) ? -1 : (x > y) ? 1 : 0)
	  })

}


//收益数组升序
Vue.prototype.sortByKeyUp=function(ary,key){
	return ary.sort(function (a, b) {
	    let  y= a[key]
	    let  x= b[key]
	    return ((x > y) ? -1 : (x < y) ? 1 : 0)
	  })

}

//计算数组某字段总和
Vue.prototype.sum_key=function(arr,key){
	var sum = 0;
	if(arr.length>0){
		  for(let i=0;i<arr.length;i++){
	     sum+=parseFloat(arr[i][key]) 
	}
	}else{
		sum=0
	}
  
	
	return sum

}
//封装登录检查
Vue.prototype.checkLogin = function() {
	try {
		var USER = uni.getStorageSync('user_uuid');
		//var weixin_openid=uni.getStorageSync('weixin_openid');
		if (USER == '') {

			return false;
		}
		return {
			'res': true,
			'user_uuid': USER
		};
	} catch (e) {
		//TODO handle the exception
	}

}
// 时间戳转换成时间
Vue.prototype.toTime = function(cjsj) {
	var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var D = date.getDate() + ' '
	var h = date.getHours() + ':'
	var m = date.getMinutes() + ':'
	var s = date.getSeconds()
	return Y + M + D + h + m + s
	//console.log(timestampToTime (1533293827000))
}

// 时间戳转换成时间
Vue.prototype.toTime2 = function(cjsj) {
	var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var D = date.getDate() + ' '
	var h = date.getHours() + ':'
	var m = date.getMinutes() + ':'
	var s = date.getSeconds()
	return Y + M + D
	//console.log(timestampToTime (1533293827000))
}



//用户每天释放明细
Vue.prototype.person_shifang=function(index,num){
	if(index<180){
		return num*0.75/180*(index)
	}else{
		return num*0.75
	}
}

//统计FIL余额
Vue.prototype.Fil_yue=function(fil_change,chongzhi,tibi,order,uni_info){
	var _self=this
	var a=[]
	var b=[]
	var c=[]
	var d=[]
	var e=[]
	var a_num=0
	var b_num=0
	var c_num=0
	var d_num=0
	var e_num=0
	var shifang_25=0
	var shifang_75=0
	var chanbi_fil=0
	var tibi_shengqing=0
	var tibi_success=0
	var tibi_bohui=0
	var daishifang=0
	
	var sum=0
	
	if(fil_change.length>0){
		a=fil_change
	}
	if(chongzhi.length>0){
		b=chongzhi
	}
	if(tibi.length>0){
		c=tibi
	}
	if(order.length>0){
		d=order
	}
	if(uni_info.length>0){
		e=uni_info
	}
	//直接释放25%
	shifang_25=_self.shifang_25(a)
	//线性释放75%
	shifang_75=_self.shifang_75(a)
	//直推提成
	for(let i=0;i<a.length;i++){
		a_num+=a[i].fChild_ticheng
		chanbi_fil+=a[i].fFil_num
	}
	//充值
	for(let i=0;i<b.length;i++){
		if(b[i].fType==0 && b[i].fStatus==1){
			b_num+=b[i].fNum
		}
	}
	//提币
	for(let i=0;i<c.length;i++){
		if(c[i].fType==0){
			c_num+=c[i].fFil_num
			if(c[i].fStatus==0){
				tibi_shengqing+=c[i].fFil_num
			}
		if(c[i].fStatus==1){
			tibi_success+=c[i].fFil_num
		}
		if(c[i].fStatus==2){
			tibi_bohui+=c[i].fFil_num
		}
		}
	}
	//订单消耗FIL
	for(let i=0;i<d.length;i++){
		d_num+=d[i].fFil
	}
	//联合账户
    e_num=
	
	sum= b_num-tibi_shengqing-d_num-tibi_success+chanbi_fil
	
	
var res=[{
	total:sum,
	shifang_25:shifang_25,
	shifang_75:shifang_75,
	tibi_shengqing:tibi_shengqing,
	tibi_success:tibi_success,
	tibi_bohui:tibi_bohui,
	chongzhi:b_num,
	child_ticheng:a_num,
	chanbi_fil:chanbi_fil,
	order_fil:d_num,
	

	
}]
return res
	
	
}

//总释放
Vue.prototype.all_shifang=function(arr,total){
	let a=total
	let b=arr
	let sum=0
	let tmp=0
	   if((180-a)>0){
			for(let j=a-1;j>=0;j--){
				sum+=b[j].fil_count*0.75/180*(j+1)
			}
			
			//sum+=(b[i].fFil_num*0.75/180)*(i+1)
		}else{
			let leval=0
			let leval_sum=0
			let sum_180=0
			leval=a-180
			for(let i=a-1;i>=180;i--){
				leval_sum+=b[i].fil_count*0.75
			}
			for(let j=179;j>=0;j--){
				sum_180+=b[j].fil_count*0.75/180*(j+1)
			}
			sum=leval_sum+sum_180
			
		}
	return sum
}

//统计数组长度
Vue.prototype.count=function(arr){
	let n=0
	if(arr!=[]){
		for(let i=1;i<arr.length;i++){
		n=i
	}
	}
	
	return n
}

//app后台运行
// let main = plus.android.runtimeMainActivity();
// //为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
// plus.runtime.quit = function() {
//     main.moveTaskToBack(false);
// };
// //重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast 
// plus.nativeUI.toast = (function(str) {
//     if (str =='再次返回退出应用') {
//         plus.runtime.quit();
//     } else {
//         uni.showToast({
//             title: '再次返回退出应用',
//             icon: 'none'
//         })
//     }
// });

app.$mount()
