(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"05e4":function(n,t,e){n.exports=e.p+"static/img/logo.a8a485f3.jpg"},"1ee0":function(n,t,e){"use strict";(function(n){var i=e("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("96cf");var a,s=i(e("1da1")),o={data:function(){return{height:"",width:"",backcolor:"#F8F8F8",show:!0,is_text:!1,phoneNum:"",count:60,timer:null,res:"",code:"",code_uid:"",tab_list:[{id:1,title:"验证码登录",info_num:0},{id:2,title:"账号登录",info_num:0}],indexTab:0,name:"",password:"",pass_word:"",is_pass_word:!1}},onNavigationBarButtonTap:function(){uni.navigateTo({url:"regist/regist"})},onLoad:function(){uni.hideLoading(),uni.setNavigationBarTitle({title:"账户登陆"});var t=this.checkLogin().user_uuid;n.log(t)},methods:{mima:function(){uni.navigateTo({url:"pass-login/pass-login"})},regist:function(){uni.navigateTo({url:"regist/regist"})},checked:function(t){n.log(t.detail.value)},onKeyInput:function(n){11!=n.target.value.length?this.is_text=!1:this.is_text=!0},get_num:function(t){var e=this;if(a=this,this.is_pass_word=!1,/^1[3456789]\d{9}$/.test(a.phoneNum)){var i=60;this.timer||(this.count=i,this.show=!1,this.timer=setInterval((function(){e.count>0&&e.count<=i?e.count--:(e.show=!0,clearInterval(e.timer),e.timer=null)}),1e3)),uni.request({url:this.tp_url+"send_sms",data:{tel:a.phoneNum},method:"GET",success:function(t){n.log(t),200==t.data.res?(a.code_uid=t.data.uid,n.log(a.code_uid),uni.showToast({title:"发送成功！"})):(uni.showToast({title:t.data.msg,icon:"none"}),clearInterval(a.timer),a.show=!0)},fail:function(t){n.log(t)}})}else uni.showModal({title:"消息提示",content:"手机号码格式错误!请重新输入",success:function(n){n.confirm&&(a.phoneNum="")}})},login:function(){a=this;var t=/^\d{6}$/;t.test(this.code)?(n.log(a.phoneNum),n.log(a.code),n.log(a.code_uid),uni.request({url:this.tp_url+"f_login_confirm",data:{tel:this.phoneNum,code:this.code,code_uid:this.code_uid},method:"GET",success:function(t){n.log(t),200==t.data.res?a.create_user(t):(uni.showModal({title:"提示",content:t.data.msg}),a.code="")}})):uni.showModal({title:"提示",content:"验证格式错误！",success:function(n){n.confirm&&(a.code="")}})},create_user:function(t){return(0,s.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:200==t.data.res?uni.showToast({title:t.data.msg,success:function(){try{uni.setStorage({key:"user_uuid",data:t.data.user_uuid,success:function(){n.log("缓存userna成功"),setTimeout((function(){uni.reLaunch({url:"../index/index"})}),1200)}})}catch(e){}}}):uni.showToast({title:t.data.msg,icon:"none"});case 1:case"end":return e.stop()}}),e)})))()}}};t.default=o}).call(this,e("5a52")["default"])},"26f6":function(n,t,e){n.exports=e.p+"static/img/back2.3c006744.png"},2725:function(n,t,e){"use strict";var i;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return s})),e.d(t,"a",(function(){return i}));var a=function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("v-uni-view",[i("v-uni-image",{staticStyle:{position:"fixed",top:"0px",right:"0px",width:"100%"},attrs:{src:e("a17d"),mode:" aspectFill"}}),i("v-uni-view",{staticClass:"u-f u-f-ajc",staticStyle:{"font-size":"24px","font-weight":"600",padding:"10px"}},[n._v("欢迎使用"+n._s(n.Config.app_name)+"！")]),i("v-uni-view",{staticClass:"u-f-dc u-f-ajc u-f-ac"},[i("v-uni-image",{staticStyle:{width:"55px",height:"55px","border-radius":"50px"},attrs:{src:e("05e4"),mode:"aspectFill"}}),i("v-uni-text",[n._v("GD登陆")])],1),i("v-uni-view",{staticClass:"u-f-dc p-10"},[i("v-uni-view",{staticClass:"u-f-l",staticStyle:{"margin-top":"10px"}},[i("v-uni-view",{staticClass:"u-f-dc m-t-10"},[i("v-uni-view",{staticClass:"u-f-dr u-f-ac",staticStyle:{"background-color":"#f1f1ff","border-radius":"20px"}},[i("v-uni-view",[i("v-uni-image",{staticStyle:{width:"20px",height:"35px","margin-left":"12px"},attrs:{src:e("d6a3"),mode:"aspectFit"}})],1),i("v-uni-view",{staticClass:"m-l-10",staticStyle:{color:"#8170fe","font-size":"x-large","font-weight":"bold"}},[i("v-uni-input",{attrs:{type:"number",maxlength:"11","confirm-type":"send",value:"",placeholder:"手机号"},on:{input:function(t){arguments[0]=t=n.$handleEvent(t),n.onKeyInput.apply(void 0,arguments)}},model:{value:n.phoneNum,callback:function(t){n.phoneNum=t},expression:"phoneNum"}})],1)],1)],1),i("v-uni-view",{staticClass:"u-f-dc m-t-10"},[i("v-uni-view",{staticClass:"u-f-dr u-f-ac",staticStyle:{"background-color":"#f1f1ff","border-radius":"20px"}},[i("v-uni-view",[i("v-uni-image",{staticStyle:{width:"20px",height:"35px","margin-left":"12px"},attrs:{src:e("5e9e"),mode:"aspectFit"}})],1),i("v-uni-view",{staticClass:"m-l-10",staticStyle:{color:"#8170fe","font-size":"larger","font-weight":"bold"}},[i("v-uni-input",{attrs:{type:"number",maxlength:"6","confirm-type":"done",value:"",placeholder:"验证码"},model:{value:n.code,callback:function(t){n.code=t},expression:"code"}})],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:n.show,expression:"show"}],staticClass:"yanzheng m-l-10",class:[n.is_text?"yanzheng":"active_yanzheng"],on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.get_num.apply(void 0,arguments)}}},[n._v("获取验证码")]),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:!n.show,expression:"!show"}],staticClass:"chongxin m-l-10"},[n._v(n._s(n.count)+"s后重新获取")])],1)],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:n.is_pass_word,expression:"is_pass_word"}],staticClass:"u-f-dc m-t-10"},[i("v-uni-view",{staticClass:"u-f-dr u-f-ac",staticStyle:{"background-color":"#f1f1ff","border-radius":"20px"}},[i("v-uni-view",[i("v-uni-image",{staticStyle:{width:"20px",height:"35px","margin-left":"12px"},attrs:{src:e("d7dd1"),mode:"aspectFit"}})],1),i("v-uni-view",{staticClass:"m-l-10",staticStyle:{color:"#8170fe","font-size":"larger","font-weight":"bold"}},[i("v-uni-input",{attrs:{type:"password",maxlength:"20","confirm-type":"send",value:"",placeholder:"登陆密码默认123456"},model:{value:n.pass_word,callback:function(t){n.pass_word=t},expression:"pass_word"}})],1)],1)],1)],1),i("v-uni-view",{staticClass:"u-f u-f-jsb"},[i("v-uni-view"),i("v-uni-view",{staticClass:"p-10"},[n._v("无法获取验证码？"),i("v-uni-text",{staticStyle:{color:"#8170fe","border-bottom":"1rpx solid #8170fe"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.mima.apply(void 0,arguments)}}},[n._v("密码登陆？")])],1)],1),i("v-uni-view",{staticClass:"u-f-dc u-f-ajc",staticStyle:{"margin-top":"10px"}},[i("v-uni-button",{staticStyle:{"background-color":"#424554",color:"#FFFFFF",width:"150px"},attrs:{type:"default"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.login()}}},[n._v("立即登陆")]),i("v-uni-text",{staticClass:"f-s m-t-10"},[n._v("备注：如果首次使用手机验证码登陆平台，则默认为注册")])],1)],1),i("v-uni-image",{staticStyle:{position:"fixed",bottom:"0px",left:"0px"},attrs:{src:e("26f6"),mode:" aspectFill"}})],1)},s=[]},"5cc9":function(n,t,e){var i=e("24fb");t=i(!1),t.push([n.i,'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* .page{\n\tbackground: url("../../static/img/222.png");\n} */.page[data-v-1a04377b]{background-color:#424554}',""]),n.exports=t},"5e9e":function(n,t,e){n.exports=e.p+"static/img/yanzhengma002.4575e454.png"},a17d:function(n,t,e){n.exports=e.p+"static/img/back.8f94afa4.png"},af78:function(n,t,e){"use strict";e.r(t);var i=e("1ee0"),a=e.n(i);for(var s in i)"default"!==s&&function(n){e.d(t,n,(function(){return i[n]}))}(s);t["default"]=a.a},b56d:function(n,t,e){var i=e("5cc9");"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var a=e("4f06").default;a("5a45febe",i,!0,{sourceMap:!1,shadowMode:!1})},d6a3:function(n,t,e){n.exports=e.p+"static/img/shouji002.996fe3f4.png"},d7dd1:function(n,t,e){n.exports=e.p+"static/img/mima.3f92af28.png"},e55b:function(n,t,e){"use strict";var i=e("b56d"),a=e.n(i);a.a},e6e8:function(n,t,e){"use strict";e.r(t);var i=e("2725"),a=e("af78");for(var s in a)"default"!==s&&function(n){e.d(t,n,(function(){return a[n]}))}(s);e("e55b");var o,u=e("f0c5"),c=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"1a04377b",null,!1,i["a"],o);t["default"]=c.exports}}]);