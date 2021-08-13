import React, { Component } from 'react';
import { Tree, Input } from 'antd';
import styles from './index.css';
const { TreeNode } = Tree;
const { Search } = Input;
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    title: "十三中学",
                    key: 1,
                    children: [
                        {
                            title: "初一年级",
                            key: 2,
                            children: [
                                {
                                    title: "一班",
                                    key: 3,
                                },
                                {
                                    title: "二班",
                                    key: 4,
                                }
                            ]
                        },
                        {
                            title: "初二年级",
                            key: 20,
                        }
                    ]
                },
                {
                    title: "八十中学",
                    key: 5,
                    children: [
                        {
                            title: "初一年级",
                            key: 6,
                            children: [
                                {
                                    title: "一班",
                                    key: 7,
                                    children: [
 
                                    ]
                                },
                                {
                                    title: "二班",
                                    key: 8,
                                    children: [
                                        {
                                            title: "一组",
                                            key: 9,
                                            children: []
                                        },
                                        {
                                            title: "vv组",
                                            key: 999,
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "初二年级",
                            key: 55,
                            children: []
                        }
                    ]
                }
            ],
            expandedKeys: [], //展开的key值
            autoExpandParent: true,
            checkedKeys: [], //选中的key,
            searchValue: '',
            searchTreeKey: [] //搜索得key
        }
    }
    //给子级添加父级Key
    addParentKeyWrapper = (tree) => {
        //深度克隆
        const data = JSON.parse(JSON.stringify(tree));
        function addParentKey(data, parentKey) {
            data.forEach(ele => {
                const { children, key } = ele;
                ele.parent_key = parentKey;
                if (children) {//如果唯一标识不是code可以自行改变
                    addParentKey(children, key)
                }
            })
        }
        addParentKey(data, null); //一开始为null,根节点没有父级
        return data;
    }
    componentDidMount() {
        this.expandedKeysFn();
 
        this.setState({
            data: this.addParentKeyWrapper(this.state.data) //调用添加父元素key
        })
    }
    onChange = (e) => { //search变化
        const { value } = e.target;
        console.log(value)
        const dataList = [];
        let searchElement = [];
        let allParentkey = [];
        if (value) {
            const generateList = data => { //tree树片扁平化
                for (let i = 0; i < data.length; i++) {
                    const node = data[i];
                    const { key, title, parent_key } = node;
                    dataList.push({ key, title: title, parent_key: parent_key });
                    if (node.children) {
                        generateList(node.children);
                    }
                }
            };
            generateList(this.state.data);
 
            const getParentKey = (key, tree) => { //获取父元素可以
                let parentKey;
                for (let i = 0; i < tree.length; i++) {
                    const node = tree[i];
                    if (node.children) {
                        if (node.children.some(item => item.key === key)) {
                            parentKey = node.key;
                        } else if (getParentKey(key, node.children)) {
                            parentKey = getParentKey(key, node.children);
                        }
                    }
                }
                return parentKey;
            };
            //上级元素
            const getParentElementKey = (searchElement, dataList) => {
                for (let i = 0; i < searchElement.length; i++) {
                    for (let j = 0; j < dataList.length; j++) {
                        if (searchElement[i] == dataList[j].key) {
                            allParentkey.push(dataList[j].key);
                            getParentElementKey([dataList[j].parent_key], dataList);
                        }
                    }
                }
            }
            const expandedKeys = dataList
                .map(item => {
                    if (item.title.indexOf(value) > -1) {
                        searchElement.push(item.key);
                        return getParentKey(item.key, this.state.data);
                    }
                    return null;
                })
                .filter((item, i, self) => item && self.indexOf(item) === i);
            getParentElementKey(searchElement, dataList);
            this.setState({
                expandedKeys: expandedKeys,
                searchValue: value,
                autoExpandParent: true,
                searchTreeKey: allParentkey
            })
        } else {
            this.expandedKeysFn() //重置展开key
            this.setState({
                searchValue: value,
                autoExpandParent: true,
                searchTreeKey: allParentkey
            })
        }
    }
    renderTreeNode = (data) => { //生成树结构函数
        if (data.length == 0) {
            return
        }
        let { expandedKeys, searchValue, searchTreeKey } = this.state;
        return data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span style={{ color: "red" }}>{searchValue}</span>
                        {afterStr}
                    </span>
                ) : (
                    <span>{item.title}</span>
                );
            if (item.children && item.children.length > 0) {
                //className={searchTreeKey.indexOf(item.key) > -1 ? styles.yes : styles.no}
                return <TreeNode className={searchTreeKey.length > 0 ? (searchTreeKey.indexOf(item.key) > -1 ? styles.yes : styles.no) : styles.yes} title={title} key={item.key} >
                    {
                        this.renderTreeNode(item.children)
                    }
                </TreeNode>
            }
            return <TreeNode className={searchTreeKey.length > 0 ? (searchTreeKey.indexOf(item.key) > -1 ? styles.yes : styles.no) : styles.yes} title={title}  ></TreeNode>
        })
    }
    expandedKeysFn = () => {
        let { data } = this.state;
        let arr = [];
        let loop = (data) => {
            data.map((item, index) => {
                arr.push(item.key);
                if (item.children && item.children.length > 0) {
                    loop(item.children)
                }
            })
        }
        loop(data);
        this.setState({
            expandedKeys: arr
        })
    }
    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };
    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys })
    }
    render() {
        let { data, expandedKeys, autoExpandParent, checkedKeys } = this.state;
        return (
            <div>
                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                <Tree
                    checkable
                    expandedKeys={expandedKeys} //默认展开的key
                    onExpand={this.onExpand} //展开事件
                    autoExpandParent={autoExpandParent} //是否自动展开父节点
                    checkedKeys={checkedKeys} //选中的key
                    onCheck={this.onCheck} //选中事件
                >
                    {this.renderTreeNode(data)}
                </Tree>
            </div>
        );
    }
}
 
export default Index
