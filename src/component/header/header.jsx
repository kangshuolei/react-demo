import React,{useState} from 'react'
import { Button } from 'antd'
import { 
    PictureOutlined,
    EditOutlined,
    FontSizeOutlined,
    SettingOutlined,
    RadiusUprightOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export default function Header(props) {
    let {
        changePenType
    } = props
    const lists = [
        {
            name:"设置图片",
            key:'img',
            icon:<PictureOutlined />
        },
        {
            name:"选中模式",
            key:'select',
            icon:<EditOutlined />
        },
        {
            name:"添加热区",
            key:'hotZone',
            icon:<RadiusUprightOutlined />
        },
        {
            name:"添加文字",
            key:"text",
            icon:<FontSizeOutlined />
        },
        {
            name:"样式设置",
            key:'style',
            icon:<SettingOutlined />
        },
        {
            name:"删除选中",
            key:"delete",
            icon:<DeleteOutlined />
        },
    ]
    const [newType, setnewType] = useState(1)
    const changeType = (e,item) => {
        if(e < 5){
            setnewType(e)
        }
        changePenType(item.key)
    }
    return (
        <div style={{padding:20}}>
            {
                lists.map((item,index) => {
                    return (
                        <Button
                            key={index}
                            icon={item.icon}
                            style={{marginRight:20}}
                            type={newType === index ? 'primary' : 'default'}
                            onClick={() => {changeType(index,item)}}
                        >{item.name}</Button>
                    )
                })
            }
        </div>
    )
}
