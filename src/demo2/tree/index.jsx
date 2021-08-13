import React,{useContext,useEffect,useState } from 'react'
import { Tree,Button } from "antd"
import {MyContext} from "../context-manager"
const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              selectable:false
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ title: 'sss', key: '0-0-1-0' }],
        },
      ],
    },
  ];
export default function Trees() {
    const onSelect = (selectedKeys,e) => {
      console.log(selectedKeys);
      setSelectedKeys(selectedKeys)
    }
    const onCheck = (checkedKeys, e) => {
      console.log(e.node);
      setCheckedKeys([e.node.key])
    }
    const context = useContext(MyContext)
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0', '0-0-1'])
    const [selectedKeys, setSelectedKeys] = useState(['0-0-0'])
    const [expandedKeys, setexpandedKeys] = useState([])
    const [defaultExpandedKeys, setdefaultExpandedKeys] = useState([])
    useEffect(() => {
      console.log(context);
    }, [context])
    const onClick = (params) => {
      //setCheckedKeys(['0-0-0-0'])
      setSelectedKeys(['0-0-1-0'])
      setexpandedKeys(['0-0-1-0'])
    }
    return (
        <div>
            <Tree
                //defaultExpandAll={true}
                //checkable={true}
                defaultExpandedKeys={defaultExpandedKeys}
                selectedKeys={selectedKeys}
                defaultCheckedKeys={['0-0-0', '0-0-1']}
                onSelect={onSelect}
                expandedKeys={expandedKeys}
                //checkedKeys={checkedKeys}
                checkStrictly={true}
                onCheck={onCheck}
                treeData={treeData}
            />
            <div style={{color:'red'}}>{context}</div>
            <Button onClick={onClick}>移动</Button>
        </div>
    )
}
