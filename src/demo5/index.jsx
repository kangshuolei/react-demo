import React,{useEffect,useState} from 'react'
import { Table,Space,Pagination,Modal, message, Button } from 'antd'
import {formateDate} from '../utils/utils'
import api from '../api/index'
import ModelCom from './components/ModelCom/index'

export default function Demo5() {
    const [data, setData] = useState([])
    const [pagePrm, setPagePrm] = useState({pageIndex:1,pageSize:10})
    const [visibleData, setVisibleData] = useState(false)
    const [currentItem, setCurrentItem] = useState({})
    const columns = [
        {
          title: 'Address',
          dataIndex: 'Address',
          key: 'Address',
        },
        {
          title: 'Character',
          dataIndex: 'Character',
          key: 'Character',
        },
        {
          title: 'Color',
          dataIndex: 'Color',
          key: 'Color',
        },
        {
            title: 'Float',
            dataIndex: 'Float',
            key: 'Float',
        },
        {
            title: 'Integer',
            dataIndex: 'Integer',
            key: 'Integer',
        },
        {
            title: 'Natural',
            dataIndex: 'Natural',
            key: 'Natural',
        },
        {
            title: 'nickName',
            dataIndex: 'nickName',
            key: 'nickName',
        },
        {
            title: 'createTime',
            dataIndex: 'createTime',
            key: 'createTime',
            render:formateDate
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={() =>{updateList(record)}}>修改</a>
              {/* <a onClick={addList}>添加</a> */}
              <a onClick={() =>{deleteList(record)}}>删除</a>
            </Space>
          ),
        },
    ];
    useEffect(() => {
        getTestMock()
    }, [])
    useEffect(() => {
        getTestMock()
    }, [pagePrm])
    const updateList = async record => {
        setCurrentItem(record)
        setVisibleData(true)
    }
    const getTestMock = async () => {
        let res = await api.getTestMock(pagePrm);
        setData(res.data.data) 
    }
    const changePage = (current,pageSize) => {
        setPagePrm({...pagePrm,pageIndex:current,pageSize:pageSize})
    }
    const getUList = async params => {
        let res = await api.updateList(params)
        message.success(res.data.message)
        getTestMock()
    }
    const addList = () => {
        setVisibleData(true) 
    }
    const getAList = async params => {
        let res = await api.addList(params)
        message.success(res.data.message)
        getTestMock()
    }
    const deleteList = async params => {
        let res = await api.deleteList(params)
        console.log(res);
        message.success(res.data.message)
        getTestMock()
    }
    return (
        <div> 
            <Button type="primary" onClick={addList}>添加</Button>
            <Table 
                columns={columns} 
                dataSource={data.rows} 
                pagination ={false}    
            />
            <Pagination 
                style={{marginTop:10}}
                current= {data.pageIndex}
                total= {data.total}
                onChange= {changePage}
                showQuickJumper
                showSizeChanger
                showTotal={total => `总共 ${data.total} 条`}
            />
            {
                visibleData && 
                <ModelCom 
                    data={currentItem}
                    close={() => {
                        setVisibleData(false)
                        setCurrentItem({})
                    }}
                    getUList={getUList}
                    getAList={getAList}
                />
            }
        </div>
    )
}
