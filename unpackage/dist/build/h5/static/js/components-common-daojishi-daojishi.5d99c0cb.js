(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["components-common-daojishi-daojishi"],{"15f8":function(t,e,n){"use strict";function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n="".concat(t);while(n.length<e)n="0".concat(n);return n}n("c975"),n("ac1f"),n("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.parseTimeData=s,e.parseFormat=c,e.isSameSecond=f;var a=1e3,o=60*a,r=60*o,u=24*r;function s(t){var e=Math.floor(t/u),n=Math.floor(t%u/r),i=Math.floor(t%r/o),s=Math.floor(t%o/a),c=Math.floor(t%a);return{days:e,hours:n,minutes:i,seconds:s,milliseconds:c}}function c(t,e){var n=e.days,a=e.hours,o=e.minutes,r=e.seconds,u=e.milliseconds;return-1===t.indexOf("DD")?a+=24*n:t=t.replace("DD",i(n)),-1===t.indexOf("HH")?o+=60*a:t=t.replace("HH",i(a)),-1===t.indexOf("mm")?r+=60*o:t=t.replace("mm",i(o)),-1===t.indexOf("ss")?u+=1e3*r:t=t.replace("ss",i(r)),t.replace("SSS",i(u,3))}function f(t,e){return Math.floor(t/1e3)===Math.floor(e/1e3)}},"191e":function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{time:{type:[String,Number],default:uni.$u.props.countDown.time},format:{type:String,default:uni.$u.props.countDown.format},autoStart:{type:Boolean,default:uni.$u.props.countDown.autoStart},millisecond:{type:Boolean,default:uni.$u.props.countDown.millisecond}}};e.default=i},"1dfd":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-count-down"},[t._t("default",[n("v-uni-text",{staticClass:"u-count-down__text"},[t._v(t._s(t.formattedTime))])])],2)},o=[]},"220b":function(t,e,n){"use strict";var i=n("fdde"),a=n.n(i);a.a},"247f":function(t,e,n){"use strict";n.r(e);var i=n("a5a4"),a=n("3ab4");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var r,u=n("f0c5"),s=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"47d8a6e0",null,!1,i["a"],r);e["default"]=s.exports},"3ab4":function(t,e,n){"use strict";n.r(e);var i=n("dcc9"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"436c":function(t,e,n){"use strict";n.r(e);var i=n("1dfd"),a=n("79b6");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("220b");var r,u=n("f0c5"),s=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"8f25feba",null,!1,i["a"],r);e["default"]=s.exports},"79b6":function(t,e,n){"use strict";n.r(e);var i=n("9828"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},8794:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-view[data-v-8f25feba], uni-scroll-view[data-v-8f25feba], uni-swiper-item[data-v-8f25feba]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-count-down__text[data-v-8f25feba]{color:#606266;font-size:15px;line-height:22px}',""]),t.exports=e},9828:function(t,e,n){"use strict";var i=n("4ea4");n("d3b7"),n("25f0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("191e")),o=n("15f8"),r={name:"u-count-down",mixins:[uni.$u.mpMixin,uni.$u.mixin,a.default],data:function(){return{timer:null,timeData:(0,o.parseTimeData)(0),formattedTime:"0",runing:!1,endTime:0,remainTime:0}},watch:{time:function(t){this.reset()}},mounted:function(){this.init()},methods:{init:function(){this.reset()},start:function(){this.runing||(this.runing=!0,this.endTime=Date.now()+this.remainTime,this.toTick())},toTick:function(){this.millisecond?this.microTick():this.macroTick()},macroTick:function(){var t=this;this.clearTimeout(),this.timer=setTimeout((function(){var e=t.getRemainTime();(0,o.isSameSecond)(e,t.remainTime)&&0!==e||t.setRemainTime(e),0!==t.remainTime&&t.macroTick()}),30)},microTick:function(){var t=this;this.clearTimeout(),this.timer=setTimeout((function(){t.setRemainTime(t.getRemainTime()),0!==t.remainTime&&t.microTick()}),50)},getRemainTime:function(){return Math.max(this.endTime-Date.now(),0)},setRemainTime:function(t){this.remainTime=t;var e=(0,o.parseTimeData)(t);this.$emit("change",e),this.formattedTime=(0,o.parseFormat)(this.format,e),t<=0&&(this.pause(),this.$emit("finish"))},reset:function(){this.pause(),this.remainTime=this.time,this.setRemainTime(this.remainTime),this.autoStart&&this.start()},pause:function(){this.runing=!1,this.clearTimeout()},clearTimeout:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(){clearTimeout(this.timer),this.timer=null}))},beforeDestroy:function(){this.clearTimeout()}};e.default=r},a5a4:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uCountDown:n("436c").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("u-count-down",{attrs:{time:t.day_num,format:"DD:HH:mm:ss",autoStart:!0,millisecond:!0},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.onChange.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"time"},[n("v-uni-text",{staticClass:"time__item"},[t._v(t._s(t.timeData.days)+" 天")]),n("v-uni-text",{staticClass:"time__item"},[t._v(t._s(t.timeData.hours>10?t.timeData.hours:"0"+t.timeData.hours)+" 时")]),n("v-uni-text",{staticClass:"time__item"},[t._v(t._s(t.timeData.minutes)+" 分")]),n("v-uni-text",{staticClass:"time__item"},[t._v(t._s(t.timeData.seconds)+" 秒")])],1)],1)],1)},o=[]},dcc9:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{timeData:{}}},props:{day_num:{type:Number,default:0}},methods:{onChange:function(t){this.timeData=t}}};e.default=i},fdde:function(t,e,n){var i=n("8794");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("0d8f49ac",i,!0,{sourceMap:!1,shadowMode:!1})}}]);