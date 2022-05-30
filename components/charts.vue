<template>
	<view>
		   <view class="qiun-bg-white qiun-title-bar qiun-common-mt">
		            <view class="qiun-title-dot-light">班组7天产量折线图</view>
		            <!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
		        </view>
		        <view class="qiun-charts">
		            <!--#ifdef MP-ALIPAY -->
		            <canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"
		             disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
		            <!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
		            <!--#endif-->
		            <!--#ifndef MP-ALIPAY -->
		            <canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA"
		             @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
		            <!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
		            <!--#endif-->
		        </view>
	</view>
</template>

<script>
	var _self,ct_id;
	import uCharts from './u-charts/u-charts.js';
	var canvaLineA = null;
	export default{
		data(){
			return{
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				outputArr : [],
				dateArr :[],
			}
		},
		components:{
			uCharts
		},
		methods:{
			 initData:function () {
			            this.sendRequest({
			                url : this.Url+"fmr_load_charts",
			                data : {ct_id : ct_id},
			                method : "POST",
			                success:function (res) {
			                    var date = [], output = [];
			                    res.data.list.map(function(item){
			                        date.push(item.time);
			                        output.push(item.total);
			                    });
			                    _self.dateArr = date;
			                    _self.outputArr = output;
			                    console.log("dateArr:" + _self.dateArr +";outputArr:" + _self.outputArr + "");
			                    
			                    let LineA = {
			                        categories: [],
			                        series: [{
			                            "name": "产量",
			                            "data": []
			                        }]
			                    };
			                    LineA.categories = _self.dateArr;
			                    LineA.series[0].data = _self.outputArr;
			                    _self.showLineA("canvasLineA", LineA);
			                }
			            },"/pages/machineGroupOutput/machineGroupOutput","1")
			        },
			        showLineA:function(canvasId, chartData) {
			            canvaLineA = new uCharts({
			                $this: _self,
			                canvasId: canvasId,
			                type: 'line',
			                fontSize: 11,
			                legend: true,
			                dataLabel: false,
			                dataPointShape: false,
			                background: '#FFFFFF',
			                pixelRatio: _self.pixelRatio,
			                categories: chartData.categories,
			                series: chartData.series,
			                animation: false,
			                enableScroll: true, //开启图表拖拽功能
			                xAxis: {
			                    disableGrid: false,
			                    type: 'grid',
			                    gridType: 'dash',
			                    itemCount: 4, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
			                    scrollShow: true, //新增是否显示滚动条，默认false
			                    scrollAlign: 'left',
			                    //scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
			                    //scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
			                },
			                yAxis: {
			                    //disabled:true
			                    gridType: 'dash',
			                    splitNumber: 8,
			                    min: 10,
			                    max: 180,
			                    format: (val) => {
			                        return val.toFixed(0) + '件'
			                    } //如不写此方法，Y轴刻度默认保留两位小数
			                },
			                width: _self.cWidth * _self.pixelRatio,
			                height: _self.cHeight * _self.pixelRatio,
			                dataLabel: true,
			                dataPointShape: true,
			                extra: {
			                    lineStyle: 'straight'
			                },
			            });
			        
			        },
			        touchLineA(e) {
			            canvaLineA.scrollStart(e);
			        },
			        moveLineA(e) {
			            canvaLineA.scroll(e);
			        },
			        touchEndLineA(e) {
			            canvaLineA.scrollEnd(e);
			            //下面是toolTip事件，如果滚动后不需要显示，可不填写
			            canvaLineA.showToolTip(e, {
			                format: function(item, category) {
			                    return category + ' ' + item.name + ':' + item.data
			                }
			            });
			        },
			        
			    },
			    onLoad:function(options){
			        _self = this;
			        this.cWidth = uni.upx2px(750);
			        this.cHeight = uni.upx2px(500);
			        
			        ct_id =  options.ct_id;
			        
			    },
			    onShow:function(){
			        _self.initData();
			    }
		
		
	}
</script>

<style scoped>
	.qiun-bg-white {
	    background: #FFFFFF;
	}
	.qiun-title-bar {
	    /* width: 96%; */
	    padding: 10upx 2%;
	    flex-wrap: nowrap;
	}
	.qiun-common-mt {
	        margin-top: 10upx;
	    }
	.qiun-title-dot-light {
	    border-left: 10upx solid #0ea391;
	    padding-left: 10upx;
	    font-size: 32upx;
	    color: #000000
	}
	/* 通用样式 */
	.qiun-charts {
	    width: 750upx;
	    height: 500upx;
	    background-color: #FFFFFF;
	}
	
	.charts {
	    width: 750upx;
	    height: 500upx;
	    background-color: #FFFFFF;
	}
</style>
