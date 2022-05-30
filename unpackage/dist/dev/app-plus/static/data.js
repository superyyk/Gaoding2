const data = [{
	image: '/static/images/menu0.png',
	name: 'xxx实验室',
	goodsArr: [{
		name: '肉松蛋糕',
		materialId: '10297',
		info: 'cake',
		tags: ['含奶制品', '可能含丰富DHA'],
		desci: '选用美国大肥牛的牛角和新西兰纽萃斯当地的小肥猪制成的肉松，单个热量为100.1焦耳，叠加来自葡萄牙的精选葡萄，突破味觉，享受美好。',
		pri: '￥19',
		priNum: 19,
		image: '/static/images/cart-good.jpg',
		chooseOptions: [{
			statuText: '冰度',
			statusItem: [{
				status: 0,
				name: '少冰',
				isPopular: true,
				pri: 0,
				isDefault: true,
				id:1
			}, {
				status: 1,
				name: '去冰',
				isPopular: false,
				pri: 0,
				isDefault: false,
				id:2
			}, {
				status: 2,
				name: '加冰',
				isPopular: false,
				pri: 0,
				isDefault: false,
				id:3
			}]
		}, {
			statuText: '甜度',
			statusItem: [{
				status: 0,
				name: '无糖',
				isPopular: true,
				pri: 0,
				isDefault: true,
				id:4
			}, {
				status: 1,
				name: '微糖',
				isPopular: false,
				pri: 0,
				isDefault: false,
				id:5
			}, {
				status: 2,
				name: '标准糖',
				isPopular: false,
				pri: 0,
				isDefault: false,
				id:6
			}, {
				status: 3,
				name: '高糖',
				isPopular: false,
				pri: 1,
				isDefault: false,
				id:7
			}]
		},{
			statuText: '取餐时间',
			statusItem: [{
				status: 0,
				name: '5分钟后',
				isPopular: true,
				pri: 0,
				isDefault: true,
				id:8
			}, {
				status: 1,
				name: '10分钟后',
				isPopular: false,
				pri: 0,
				isDefault: false,
				id:9
			}, {
				status: 2,
				name: '20分钟后',
				isPopular: false,
				pri: 0,
				isDefault: false,
				id:10
			}, {
				status: 3,
				name: '30分钟后',
				isPopular: false,
				pri: 1,
				isDefault: false,
				id:11
			}]
		},{
			statuText: '打包方式',
			statusItem: [{
				status: 0,
				name: '无需打包',
				isPopular: true,
				pri: 0,
				isDefault: true,
				id:12
			}, {
				status: 1,
				name: '普通打包',
				isPopular: false,
				pri: 0,
				isDefault: false,
				id:13
			}, {
				status: 2,
				name: '保温打包',
				isPopular: false,
				pri: 3,
				isDefault: false,
				id:14
			}]
		}],
		storage: 90,
		mostBuy: 20,
		leastBuy: 1
	}]
}]

export default data
