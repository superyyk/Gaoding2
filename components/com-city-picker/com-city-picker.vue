<template>
	<div class="com-picker">
		<div :class="{ pickerMask: showPicker }" @click="maskClick" catchtouchmove="true"></div>
		<div class="com-picker-content " :class="{ 'com-picker-view-show': showPicker }">
			<div class="com-picker__hd" catchtouchmove="true">
				<div class="com-picker__action" @click="pickerCancel">取消</div>
				<div class="com-picker__action" @click="pickerConfirm">确定</div>
			</div>
			<picker-view indicator-style="height: 40px;" class="com-picker-view" :value="value" @change="pickerChange">
				<block>
					<picker-view-column v-for="(item, index) in pickerList" :key="index">
						<div class="picker-item" v-for="(i, ind) in item.list" :key="ind">{{ i.label }}</div>
					</picker-view-column>
				</block>
			</picker-view>
		</div>
	</div>
</template>

<script>
import area  from './area.js';
//var area=require('./area.js')
export default {
	data() {
		return {
			showPicker: false,
			value: [0, 0, 0],
			pickerList: [
				{ name: 'province_list', list: [], label: '', code: '' },
				{ name: 'city_list', list: [], label: '', code: '' },
				{ name: 'county_list', list: [], label: '', code: '' }
			],
			select: []
		};
	},
	onReady() {
		this.onInit();
	},
	
	methods: {
		onInit() {
			const p = this.pickerList[0];
			p.list = this.getArr(area[p.name]);
			const a = { detail: { value: []}}
			a.detail.value = this.value
			this.pickerChange(a)
		},

		pickerChange(e) {
			let arr = e.detail.value;
			const p = this.pickerList[0];
			const c = this.pickerList[1];
			const a = this.pickerList[2];

			if (this.value[0] !== arr[0]) {
				this.value = [arr[0], 0, 0];
				arr = this.value;
			} else if (this.value[1] !== arr[1]) {
				this.value = [arr[0], arr[1], 0];
				arr = this.value;
			}

			p.code = p.list[arr[0]].code;
			p.label = p.list[arr[0]].label;

			c.list = this.getArr(this.filter(c.name, p.code));
			c.code = c.list[arr[1]].code;
			c.label = c.list[arr[1]].label;

			a.list = this.getArr(this.filter(a.name, c.code));
			a.code = a.list[arr[2]].code;
			a.label = a.list[arr[2]].label;

			this.select = this.pickerList.map(item => {
				return { label: item.label, code: item.code };
			});
		},

		// 根据上一级编码， 获取下一级对象
		filter(name, code) {
			const result = {};
			const reg = new RegExp('^' + code.replace(/0+$/, '\\d+'));
			for (const key in area[name]) {
				if (area[name].hasOwnProperty(key) && reg.test(key)) {
					result[key] = area[name][key];
				}
			}
			return result;
		},

		getArr(obj) {
			const arr = [];
			for (let i in obj) {
				arr.push({ label: obj[i], code: i });
			}
			return arr;
		},
		
		show() {
			setTimeout(() => {
				this.showPicker = true;
			}, 0);
		},
		
		maskClick() {
			this.pickerCancel();
		},
		
		pickerCancel() {
			this.showPicker = false;
		},
		
		pickerConfirm(e) {
			this.showPicker = false;
			this.$emit('onConfirm', this.select);
		},
		
		showPickerView() {
			this.showPicker = true;
		}
	}
};
</script>

<style>
.pickerMask {
	position: fixed;
	z-index: 1000;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
}

.com-picker-content {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	transition: all 0.3s ease;
	transform: translateY(100%);
	z-index: 3000;
}

.com-picker-view-show {
	transform: translateY(0);
}

.com-picker__hd {
	display: flex;
	padding: 9px 15px;
	background-color: #fff;
	position: relative;
	text-align: center;
	font-size: 17px;
}

.com-picker__hd:after {
	content: ' ';
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	height: 1px;
	border-bottom: 1px solid #e5e5e5;
	color: #e5e5e5;
	transform-origin: 0 100%;
	transform: scaleY(0.5);
}

.com-picker__action {
	display: block;
	flex: 1;
	color: #1aad19;
}

.com-picker__action:first-child {
	text-align: left;
	color: #888;
}

.com-picker__action:last-child {
	text-align: right;
}

.picker-item {
	text-align: center;
	line-height: 40px;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 16px;
}

.com-picker-view {
	position: relative;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 238px;
	background-color: rgba(255, 255, 255, 1);
}
</style>
