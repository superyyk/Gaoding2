<template>
<view class="ksp-editor">
	<view class="body">
		<view class="content">
			<view class="node" v-for="(node, index) in nodes" :key="node.id">
				<textarea placeholder="输入并编辑新闻内容" placeholder-style="font-size:small;color:#dbdbdb;" auto-focus="true" @blur="textBlur($event, index)" @input="textChange($event, node)" class="text" auto-height="true" maxlength="-1" v-if="node.type == 'text'" :cursor="node.cursor" :value="node.content"></textarea>
				<image @load="imageLoad($event, node)" class="image" :style="{width: node.width, height: node.height}" v-if="node.type == 'image'" :src="node.url"></image>
				<image @tap="deleteImage($event, node, index)" class="btn-delete" v-if="node.type == 'image'" src="data:image/png;base64,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"></image>
			</view>
		</view>
	</view>
	<view class="toolbar">
		<view class="u-f-dr u-f-ac">
			<image src="/static/addimg.png" mode="aspectFill" class="img_20"></image>
			<text @tap="selectImage" style="color: blue; border-bottom: 1px solid blue; margin-left: 10px;">插入图片</text>
		
		</view>
		
		<button @tap="save" class="btn-save">保存编辑</button>
	</view>
</view>
</template>

<script>
export default {
	props: {
		list: {
			default: null
		}
	},
	data() {
		return {
			sequence: 0,
			selection: {
				index: 0,
				cursor: 0
			},
			nodes: [],
			url: "http://ehome-totem.img-cn-shenzhen.aliyuncs.com/1912021526894820202354639.png"
		};
	},
	mounted() {
		this.initNodes();
	},
	methods: {
		obtainSequence() {
			this.sequence++;
			return this.sequence;
		},
		initNodes() {
			var list = this.list || [];
			if (Object.prototype.toString.call(list) != "[object Array]") {
				throw new Error("数据格式不正确！")
			}
			var nodes = [];
			for(var i = 0; i < list.length; i++) {
				var ele = list[i];
				if (ele.type == "text") {
					var node = {};
					node.type = "text";
					node.id = this.obtainSequence();
					node.content = ele.content || "";
					nodes.push(node);
				} else if (ele.type == "image") {
					var node = {};
					node.type = "image";
					node.id = this.obtainSequence();
					node.width = "100px";
					node.height = "100px";
					node.url = ele.url || "";
					nodes.push(node);
				}
			}
			this.nodes = nodes;
			this.trimNodes();
		},
		trimNodes() {
			var list = this.nodes;
			var nodes = [];
			var temp = null;
			for(var i = 0; i < list.length; i++) {
				var node = list[i];
				if (node.type == "image") {
					nodes.push(node);
					temp = null;
					continue;
				}
				if (!temp) {
					temp = node;
					nodes.push(temp);
					continue;
				}
				if (node.type == "text") {
					temp.content += node.content;
				}
			}
			if (nodes.length == 0 || nodes[nodes.length - 1].type != "text") {
				var node = {};
				node.id = this.obtainSequence();
				node.type = "text";
				node.content = "";
				nodes.push(node);
			}
			this.nodes = nodes;
		},
		imageLoad(ev, node) {
			var query = uni.createSelectorQuery().in(this);
			query.select(".content").boundingClientRect((data) => {
				var cw = data.width;
				var iw = ev.detail.width;
				var ih = ev.detail.height;
				node.width = cw + "px";
				node.height = ih / iw * cw + "px";
			}).exec();
		},
		textChange(ev, node) {
			node.content = ev.detail.value;
			setTimeout(() => {
				node.cursor = 1;
			}, 500)
		},
		textBlur(ev, index) {
			this.selection.index = index;
			this.selection.cursor = ev.detail.cursor;
		},
		selectImage() {
			this.$emit("selectImage");
		},
		addImage(url) {
			var index = this.selection.index;
			var cursor = this.selection.cursor;
			var snode = this.nodes[index];
			var content = snode.content;
			if (cursor == 0) {
			} else if (cursor < content.length) {
				snode.content = content.substring(0, cursor);
				var node = {};
				node.id = this.obtainSequence();
				node.type = "text";
				node.content = content.substring(cursor);
				this.nodes.splice(index + 1, 0, node);
				index++;
			} else {
				index++;
			}
			var node = {};
			node.id = this.obtainSequence();
			node.type = "image";
			node.url = url;
			node.width = "100px";
			node.height = "100px";
			this.nodes.splice(index, 0, node);
			this.trimNodes();
		},
		deleteImage(ev, node, index) {
			uni.showModal({
				content: '你确定删除吗？',
				success: (res) => {
					if (!res.confirm) {
						return;
					}
					this.nodes.splice(index, 1);
					if (this.selection.index > index) {
						this.selection.index--;
					}
					this.trimNodes();
					var url = node.url;
					this.$emit("deleteImage", {url: url});
				}
			});
		},
		save() {
			var result = [];
			for(var i = 0; i < this.nodes.length; i++) {
				var node = this.nodes[i];
				var ele = {};
				ele.type = node.type;
				if (node.type == "text") {
					ele.content = node.content;
				} else if (node.type == "image") {
					ele.url = node.url;
				}
				result.push(ele);
			}
			this.$emit("save", {result: result});
		}
	},
	watch: {
		"list": function() {
			this.initNodes();
		}
	}
}
</script>

<style>
.ksp-editor {
	position: relative;
	width: 100%;
	height: 1000rpx;
	left: 0upx;
	top: 0upx;
}
.toolbar {
	position: absolute;
	width: 100%;
	height: 100upx;
	left: 0upx;
	bottom: 0upx;
	box-sizing: border-box;
	border-top: 1px solid #f1f1f1;
	background: #fff;
}
.btn-img {
	position: absolute;
	width: 60upx;
	height: 60upx;
	margin-left: 10px;
	top: 20upx;
}
.btn-save {
	position: absolute;
	right: 30upx;
	top: 15upx;
	font-size: 30upx;
	line-height: 30upx;
	padding: 20upx;
	color: #333333;
}
.body {
	position: absolute;
	left: 0upx;
	right: 0upx;
	top: 0upx;
	bottom: 100upx;
	background: white;
}
.content {
	position: absolute;
	left: 20upx;
	right: 20upx;
	top: 20upx;
	bottom: 20upx;
	overflow-y: auto;
}
.node {
	position: relative;
	overflow: hidden;
}
.text {
	width: 100%;
	font-size: 28upx;
}
.btn-delete {
	position: absolute;
	width: 60upx;
	height: 60upx;
	right: 30upx;
	bottom: 30upx;
	background-color: #333333;
	color: #fff;
	padding: 5px;
	border-radius: 5px;
}
</style>
