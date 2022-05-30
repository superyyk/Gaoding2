<template>
	<picker @change="pickerChange" @columnchange="columnchange" :range="array" range-key="name" :value="value" mode="multiSelector">
		<slot></slot>
	</picker>
</template>

<script>
	import AllAddress from './data.js'
	export default {
		data() {
			return{
				value: [],
				array: [],
				index: 0
			}
		},
		props:{
			level:{ //级数
				type: Number,
				default: 3
			}
		},
		created() {
			this.init()
		},
		methods:{
			// 初始化地址选项
			init() {
				this.array = new Array(this.level);
				for(let i = 0; i<this.array.length;i++){
					if(i==0){
						this.array[i] = AllAddress
					} else {
						this.array[i] = [];
						if (this.array[i-1][0].children != null) {
							this.array[i] = this.array[i-1][0].children;
						}
					}
					
				}
				this.$forceUpdate()
			},
			// 地址控件改变控件
			columnchange(e) {
				let aIndex = e.detail.column+1;
				let j = e.detail.value;
				for(let i=aIndex; i<this.array.length; i++){
					this.array[i] = [];
					if (this.array[i-1][j].children != null) {
						this.array[i] = this.array[i-1][j].children;
					}
				}
				this.$forceUpdate();
			},
			
			/**
			 * 点击确定
			 * */
			pickerChange(e) {
				var result =  [];
				for(let i=0; i<this.array.length; i++){
					result.push({
						name: this.array[i][e.target.value[i]].name,
						id: this.array[i][e.target.value[i]].id
					})
				};
				this.$emit('change', {
					data: result
				})
			}
			
		}
	}
</script>

<style>
</style>
