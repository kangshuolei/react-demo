import React,{useRef,useEffect} from 'react'
import { Modal,Form,Input,Button,message } from 'antd'

export default function ModelCom(props) {
    const {
        close,
        data,
        getUList,
        getAList
    } = props
    const layout = {    //form表单样式
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    useEffect(() => {
        formRef.current.setFieldsValue(data)
    }, [])
    const formRef = useRef()
    const onFinishModal = (params) => {
        console.log(params,Object.keys(data).length);
        Object.keys(data).length > 0 ? getUList({...params,key:data.key}) :getAList({...params,createTime:Date.parse(new Date())})
        close()
    }
    const onFinishFailed = (params) => {
        
    }
    return (
        <Modal 
            title={data.key ? '更新表格数据' : '添加表格数据'}
            visible
            onCancel={() => {
                close()
            }}
            footer={
                [] // 设置footer为空，去掉 取消 确定默认按钮
            }
        >
            <Form
                {...layout}
                name="basic"
                ref={formRef}
                onFinish={onFinishModal}
                onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Address"
                        name="Address"
                        rules={[{ required: true, message: '请输入Address!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Character"
                        name="Character"
                        rules={[{ required: true, message: '请输入Character!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Color"
                        name="Color"
                        rules={[{ required: true, message: '请输入Color!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Float"
                        name="Float"
                        rules={[{ required: true, message: '请输入Float!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Integer"
                        name="Integer"
                        rules={[{ required: true, message: '请输入Integer!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Natural"
                        name="Natural"
                        rules={[{ required: true, message: '请输入Natural!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="nickName"
                        name="nickName"
                        rules={[{ required: true, message: '请输入nickName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{marginRight: 8}} onClick={close}>关闭</Button>
                        <Button htmlType="submit" type="primary">保存</Button>
                    </Form.Item>
                </Form>
        </Modal>
    )
}
