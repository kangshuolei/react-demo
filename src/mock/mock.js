import Mock from 'mockjs';
let dataList = []
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据
for (let i = 0; i < 26; i++) { // 可自定义生成的个数
  const template = {
    'key': Random.id(),
    'Boolean': Random.boolean, // 可以生成基本数据类型
    'Natural': Random.natural(1, 10), // 生成1到100之间自然数
    'Integer': Random.integer(1, 100), // 生成1到100之间的整数
    'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
    'Character': Random.character(), // 生成随机字符串,可加参数定义规则
    'title': Random.string(20, 30), // 生成2到10个字符之间的字符串
    'Range': Random.range(0, 10, 2), // 生成一个随机数组
    'createTime': Random.datetime('T'), // 生成一个随机日期,可加参数定义日期格式
    //'createTime': Random.timestamp(13), // 生成一个随机日期,可加参数定义日期格式
    'avatarUrl': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
	  "imgList": [{
				"url": Random.image(Random.size, '#02adea', '1'),
			},{
				"url": Random.image(Random.size, '#02adea', '2'),
			},{
				"url": Random.image(Random.size, '#02adea', '3'),
			},{
				"url": Random.image(Random.size, '#02adea', '4'),
		}],
    'Color': Random.color(), // 生成一个颜色随机值
    'title': Random.paragraph(2, 3), // 生成2至5个句子的文本
    'nickName': Random.name(), // 生成姓名
    'Url': Random.url(), // 生成web地址
    'Address': Random.province() // 生成地址
  }
  dataList.push(template)
}

//获取表格信息
const getList = option => {
    // 若 localStorage 没有数据，则将 Mock 的数据存入
    if (!localStorage.getItem('dataList')) {
      localStorage.setItem('dataList',JSON.stringify(dataList))
    }
    // 每次获取数据时，再从 localStorage 中拉取数据
    let getDataList = JSON.parse(localStorage.getItem('dataList'))
    let info = JSON.parse(option.body)
    let [index, size, total] = [info.pageIndex, info.pageSize, dataList.length]
    let len = total / size
    let totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
    let newDataList = getDataList.slice( (index-1) * size, index * size)

    return {
      'code': 200,
      'message': 'success',
      'data': {
        'pageIndex': index,
        'pageSize': size,
        'rows': newDataList,
        'total': total,
        'totalPages': totalPages
      }
    };
}
//更新表格信息
const upDateList = option => {
    let info = JSON.parse(option.body)
    let getDataList = JSON.parse(localStorage.getItem('dataList'))
    for ( let index in getDataList ) {
      if ( getDataList[index].key === info.key ) {
        Object.keys(info).forEach(item => {getDataList[index][item] = info[item]})
      }
    }
    localStorage.setItem('dataList', JSON.stringify(getDataList))
    return {
      code: 200,
      message: '更新成功',
    }
}
//添加表格
const addList = option => {
    // 先从 localStorage 中拉取数据
    let dataList = JSON.parse(localStorage.getItem('dataList'))
    // 获取传入信息对象，是一个字符串，需要转化为对象
    let info = JSON.parse(option.body)
    // 使用 mock 随机生成一个 id
    info.key = Random.id()
    // 将 info 插入到 dataList 中
    dataList.unshift(info)
    // 重新将 dataList 存入 localStorage 中
    localStorage.setItem('dataList', JSON.stringify(dataList))
    return {
      code: 200,
      data: '添加成功'
    }
}
//删除表格
const deleteList = option => {
    let info = JSON.parse(option.body)
    // 先从 localStorage 中拉取数据
    let dataList = JSON.parse(localStorage.getItem('dataList'))
    // 根据传递的 id 删除 用户
    console.log(info.key)
    for( let index in dataList ) {
      if (dataList[index].key === info.key) {
        dataList.splice(index,1)
        localStorage.setItem('dataList', JSON.stringify(dataList))
      }
    }
    return {
      code: 200,
      message: '删除成功'
    }
}

Mock.mock('/api/mock/getList','post',getList);
Mock.mock('/api/mock/upDateList','post',upDateList);
Mock.mock('/api/mock/addList','post',addList);
Mock.mock('/api/mock/deleteList','post',deleteList);



































// // 首先引入Mock
// const Mock = require('mockjs');

// // 设置拦截ajax请求的相应时间
// Mock.setup({
//   timeout: '200-600'
// });

// let configArray = [];

// // 使用webpack的require.context()遍历所有mock文件
// const files = require.context('.', true, /\.js$/);
// files.keys().forEach((key) => {
//   if (key === './index.js') return;
//   configArray = configArray.concat(files(key).default);
// });

// // 注册所有的mock服务
// configArray.forEach((item) => {
//   for (let [path, target] of Object.entries(item)) {
//     let protocol = path.split('|');
//     Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
//   }
// });
