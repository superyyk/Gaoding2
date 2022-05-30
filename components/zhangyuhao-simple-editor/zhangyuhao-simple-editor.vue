<template>
    <view :style="{
        backgroundColor: backgroundColor
    }">
        <block v-if="onlyshow">
            <view class="workspace onlyshow">
                <view v-for="(item,index) in domData" :key="item.symbol" class="item-box">
                    <!-- 文本 -->
                    <view v-if="item.type == 'text'" class="text">{{item.content}}</view>
                    <!-- 图片 -->
                    <view v-if="item.type == 'image'">
                        <image mode="widthFix" :src="item.content" style="width: 100%;"></image>
                    </view>
                    <!-- 视频 -->
                    <view v-if="item.type == 'video'">
                        <video :src="item.content" style="width: 100%;"></video>
                    </view>
                </view>
            </view>
        </block>
        <block v-else>
            <view class="workspace">
                <view v-for="(item,index) in domData" :key="item.symbol" class="item-box">
                    <!-- 文本 -->
                    <view v-if="item.type == 'text'">
                        <textarea auto-height placeholder="请输入内容" class="textarea" v-model="item.content"
                            :maxlength="-1"></textarea>
                    </view>
                    <!-- 图片 -->
                    <view v-if="item.type == 'image'">
                        <image mode="widthFix" :src="item.content" style="width: 100%;"></image>
                    </view>
                    <!-- 视频 -->
                    <view v-if="item.type == 'video'">
                        <video :src="item.content" style="width: 100%;"></video>
                    </view>
                    <!-- 操作 -->
                    <view class="operation">
                        <view class="btn btn-up" v-if="index > 0" @click="up(index)">
                            <image src="../../static/zhangyuhao-simple-editor/up.png"></image>
                        </view>
                        <view class="btn btn-down" v-if="index < data.length-1" @click="down(index)">
                            <image src="../../static/zhangyuhao-simple-editor/down.png"></image>
                        </view>
                        <view class="btn btn-del" @click="del(index)">
                            <image src="../../static/zhangyuhao-simple-editor/del.png"></image>
                        </view>
                    </view>
                </view>
            </view>
            <view class="btn-box">
                <block v-for="btn in btns">
                    <view class="btn" :key="btn" v-if="btn == 'text'" hover-class="btn-hover" hover-stay-time="150"
                        @click="add('text')">
                        <image src="../../static/zhangyuhao-simple-editor/text.png"></image>
                        <text>添加文本</text>
                    </view>
                    <view class="btn" :key="btn" v-if="btn == 'image'" hover-class="btn-hover" hover-stay-time="150"
                        @click="chooseImage()">
                        <image src="../../static/zhangyuhao-simple-editor/image.png"></image>
                        <text>添加图片</text>
                    </view>
                    <view class="btn" :key="btn" v-if="btn == 'video'" hover-class="btn-hover" hover-stay-time="150"
                        @click="chooseVideo()">
                        <image src="../../static/zhangyuhao-simple-editor/video.png"></image>
                        <text>添加视频</text>
                    </view>
                </block>
            </view>
            <view class="tips" @click="test()">请添加您的内容</view>
        </block>
    </view>
</template>

<script>
    export default {
        name: "zhangyuhao-simple-editor",
        props: {
            // 初始的html
            value: {
                type: String,
                default: ''
            },
            onlyshow: {
                type: Boolean,
                default: false,
            },
            // 上传的地址
            action: {
                type: String,
                default: ''
            },
            // 上传文件的文件名
            fileName: {
                type: String,
                default: 'file'
            },
            // 额外参数
            formData: {
                type: Object,
                default () {
                    return {}
                }
            },
            header: {
                type: Object,
                default () {
                    return {}
                }
            },
            // 组件背景颜色
            backgroundColor: {
                default: '#FFF'
            },
            // 可以编辑的按钮
            btns: {
                type: Array,
                default () {
                    return ['text', 'image', 'video'];
                },
                validator: function(value) {
                    const set = new Set(value);
                    // 不可包含重复项
                    return set.size == value.length;
                }
            },
            // 上传成功的处理函数，要求返回格式为{success:true,url:'xxx'}的对象
            uploadSuccess: {
                type: Function,
                default: (res) => {
                    return {
                        success: false,
                        url: ''
                    }
                }
            },
            // 图片大小限制
            imageMaxSize: {
                type: Number,
                default: 0
            },
            // 视频大小限制
            videoMaxSize: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                data: [] // 供操作数据
            };
        },
        computed: {
            html() {
                let result = []
                this.data.forEach(item => {
                    if (item.type == 'text') {
                        result.push(`<div>${item.content}</div>`)
                    } else if (item.type == 'image') {
                        result.push(`<img src="${item.content}" style="width: 100%;" />`)
                    } else if (item.type == 'video') {
                        result.push(`<video src="${item.content}" style="width: 100%;"></video>`)
                    }
                })
                return result.join('');
            },
            // 计算dom数据
            domData() {
                // console.log('调用domData：' + this.value)
				
                var el = document.createElement('div');
                el.innerHTML = this.value;
                var data = [];
                for (var i = 0; i < el.childNodes.length; i++) {
                    var type = '';
                    var content = '';
                    if (el.childNodes[i].tagName == 'DIV') {
                        type = "text";
                        content = el.childNodes[i].innerText;
                    } else if (el.childNodes[i].tagName == 'IMG') {
                        type = "image";
                        content = el.childNodes[i].getAttribute('src');
                    } else if (el.childNodes[i].tagName == 'VIDEO') {
                        type = "video";
                        content = el.childNodes[i].getAttribute('src');
                    }
                    data.push({
                        type: type,
                        content: content || '',
                        id: type + i
                    });
                }
                this.data = data; // 存到data里，供操作
                return this.data;
            }
        },
        watch: {
            html(val) {
                this.$emit('input', val)
            }
        },
        methods: {
            test() {
                console.log(this.html)
            },
            // 添加元素
            add(type, content) {
                this.data.push({
                    type: type,
                    content: content || '',
                    symbol: Symbol()
                });
            },
            del(index) {
                uni.showModal({
                    title: '提示',
                    content: '确定要删除该区块吗？',
                    success: (res) => {
                        if (res.confirm) {
                            this.data.splice(index, 1);
                        }
                    }
                });
            },
            up(index) {
                let ele = this.data.splice(index, 1)[0];
                this.data.splice(index - 1, 0, ele)
            },
            down(index) {
                let ele = this.data.splice(index, 1)[0];
                this.data.splice(index + 1, 0, ele)
            },
            // 选择图片并上传
            chooseImage() {
                uni.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    // sourceType: ['album'], //从相册选择
                    success: (res) => {
                        if (this.imageMaxSize && res.tempFiles[0].size > this.imageMaxSize * 1024 * 1024) {
                            uni.showModal({
                                title: '提示',
                                content: `文件过大，请上传小于${this.imageMaxSize}MB的文件`,
                                showCancel: false
                            })
                            return;
                        }
                        uni.showLoading({
                            title: '上传中',
                            mask: true
                        });
                        
                        uni.uploadFile({
                            url: this.action,
                            filePath: res.tempFilePaths[0],
                            name: this.fileName,
                            formData: this.formData,
                            fileType: 'image',
                            header: this.header,
                            success: (res) => {
                                let result = this.uploadSuccess(res);
                                if (result.success) {
                                    this.add('image', result.url)
                                } else {
                                    uni.showToast({
                                        title: '上传失败'
                                    });
                                }
                            },
                            complete: () => {
                                uni.hideLoading()
                            }
                        });
                    }
                });
            },
            // 选择视频并上传
            chooseVideo() {
                uni.chooseVideo({
                    count: 1,
                    sourceType: ['camera', 'album'],
                    success: (res) => {
                        if (this.videoMaxSize && res.tempFile.size > this.videoMaxSize * 1024 * 1024) {
                            uni.showModal({
                                title: '提示',
                                content: `文件过大，请上传小于${this.videoMaxSize}MB的文件`,
                                showCancel: false
                            })
                            return;
                        }
                        uni.showLoading({
                            title: '上传中',
                            mask: true
                        });
                        
                        uni.uploadFile({
                            url: this.action,
                            filePath: res.tempFilePath,
                            name: this.fileName,
                            formData: this.formData,
                            fileType: 'video',
                            header: this.header,
                            success: (res) => {
                                let result = this.uploadSuccess(res);
                                if (result.success) {
                                    this.add('video', result.url)
                                } else {
                                    uni.showToast({
                                        title: '上传失败'
                                    });
                                }
                            },
                            complete: () => {
                                uni.hideLoading()
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .workspace {

        // padding: 0 20rpx;
        &.onlyshow {
            padding: 0;

            .item-box {
                border: none;
                margin-bottom: 0;

                .text {
                    white-space: pre-wrap;
                    border-bottom: 0;
                    padding: 0rpx;
                    margin-bottom: 10rpx;
                }

                image {
                    display: block;
                }
            }
        }

        .item-box {
            border: 1rpx solid #eee;
            margin-bottom: 10rpx;

            .operation {
                height: 50rpx;
                display: flex;
                justify-content: flex-end;
            }

            .btn {

                width: 50rpx;
                height: 50rpx;

                image {
                    width: 40rpx;
                    height: 40rpx;
                }
            }

            .textarea {
                padding: 20rpx;
                width: 100%;
                box-sizing: border-box;
                border-bottom: 1rpx dashed #eee;
                margin-bottom: 15rpx;
            }
        }
    }

    .btn-box {
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        .btn {
            display: flex;
            font-size: 26rpx;
            justify-content: center;
            align-items: center;
            width: 200rpx;
            height: 60rpx;
            border: 1rpx solid #eee;
            color: #666;

            image {
                width: 40rpx;
                height: 40rpx;
            }

            &.btn-hover {
                background-color: #eee;
            }
        }
    }

    .tips {
        font-size: 24rpx;
        color: #b5bdce;
        text-align: center;
    }
</style>
