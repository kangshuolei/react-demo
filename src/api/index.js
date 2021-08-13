import axios from "axios";
import { testServer } from './config'
import '../mock/mock'
const instance = axios.create({
	baseURL: testServer,
	responseType: 'json'
})
export default {
    //获取表格信息
    getTestMock(data,config) {
        return instance.post('/mock/getList',data,config)
    },
    //更新表格信息
    updateList(data,config) {
        return instance.post('/mock/upDateList',data,config)
    },
    //添加表格信息
    addList(data,config) {
        return instance.post('/mock/addList',data,config)
    },
    //删除表格信息
    deleteList(data,config) {
        return instance.post('/mock/deleteList',data,config)
    }

}
