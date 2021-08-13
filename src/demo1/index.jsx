import React,{useState} from 'react'
import Header from '../component/header/header'
import Canvans from '../component/canvans/canvans'
import {fabric} from 'fabric'
import { message,Drawer } from "antd"
import StyleSet from '../component/styleEdit/styleEdit'
import ImgUrl from './img/54545.jpg'
import "../component/canvans/canvans.scss"
let mouseFrom = {}
let canvas = null
let roofPoints = []
let lines = []
let lineCounter = 0
let x = ""
let y = ""
let penType = ''
let roof = null
let textBox = null
let ctxSize = 6
let ctxColor = '#000000'
export default function HotZone() {
    const [visible, setVisible] = useState(false);
    const [ctxColorPro, setCtxColor] = useState('#000000')
    const [ctxSizePro, setCtxSize] = useState(6)
    //关闭抽屉组件
    const onClose = () => {
        setVisible(false);
    };
    //header组件的按钮点击事件
    const changePenType = type => {
        if(type === "img") addImg()
        if(type === "hotZone") addHotZone()
        if(type === "text") addText()
        if(type === "select") selectCanvas()
        if(type === "delete") deleteCanvas()
        if(type === "style") styleEditFun()
        if( textBox ){
            //退出文本编辑模式
            textBox.exitEditing()
            textBox = null
        }
    }
    //样式编辑
    const styleEditFun = () => {
        penType = "style"
        setVisible(true);
    }
    //删除选中canvas元素
    const deleteCanvas = () => {
        penType = "delete"
        if(canvas.getActiveObject()){
            canvas.remove(canvas.getActiveObject())
        }else{
            message.warning("无有效选中")
        }
    }
    //添加文字
    const addText = () => {
        penType = 'text'
        canvas.skipTargetFind = true
        canvas.selection = false
    }
    //鼠标选中功能
    const selectCanvas = () => {
        penType = 'select'
        //整个画板元素都被选择
        canvas.skipTargetFind = false
        //画板元素能被选中
        canvas.selection = true
    }
    //添加canvas背景图片
    const addImg = () => {
        penType = 'img'
        fabric.Image.fromURL(ImgUrl,(oImg) => {
            oImg.selectable = false
            canvas.add(oImg)
        })
    }
    //添加热区
    const addHotZone = () =>{
        penType = 'hotZone'
        //整个画板元素都不能被选择
        canvas.skipTargetFind = true
        //画板元素不能被选中
        canvas.selection = false
    }
    //获取canvas节点并添加监听事件
    const hotRef = node => {
        console.log(node);
        if(node !== null){
            let height = document.body.clientHeight -72
            let width = document.body.clientWidth -20
    
            canvas = new fabric.Canvas(node)
            
            canvas.setDimensions({
                width,
                height
            });
            //选中图层不置顶
            canvas.preserveObjectStacking = true
            //鼠标按下触发
            canvas.on("mouse:down",mouseDownFun)
            //鼠标按下抬起时触发
            canvas.on("mouse:up",mouseUpFun)
            //鼠标移动时触发
            canvas.on("mouse:move",mouseMoveFun)
            //鼠标双击时触发
            canvas.on("mouse:dblclick",mouseDbClickFun)
        }
    }
    const makeRoof = () => {
        let left = findLeftPaddingForRoof(roofPoints);
        let top = findTopPaddingForRoof(roofPoints);
        let a = {}

        a["x"] = roofPoints[0].x;
        a["y"] = roofPoints[0].y;
        roofPoints.push(a);
        roof = new fabric.Polyline(roofPoints, {
            fill: "rgba(255, 255, 255, 0)",
            strokeWidth:ctxSize,
            stroke: ctxColor,
            left:left,
            top:top
        });
    }
    const findTopPaddingForRoof = roofPoints => {
        let result = 999999;
        for (let f = 0; f < lineCounter; f++) {
          if (roofPoints[f].y < result) {
            result = roofPoints[f].y;
          }
        }
        return Math.abs(result);
    }
    const findLeftPaddingForRoof = roofPoints => {
        let result = 999999;
        for (let i = 0; i < lineCounter; i++) {
            if (roofPoints[i].x < result) {
            result = roofPoints[i].x;
            }
        }
        return Math.abs(result);
    }
    //鼠标双击事件
    const mouseDbClickFun = e =>{
        if(penType === "hotZone"){
            lines.forEach(item => canvas.remove(item));
            // canvas.remove(lines[lineCounter - 1]);
            makeRoof();
            canvas.add(roof);
            canvas.renderAll();

            console.log("double click");
            //clear arrays
            roofPoints = [];
            lines = [];
            lineCounter = 0;
        }
    }
    //鼠标移动事件
    const mouseMoveFun = e => {
        if(penType === "hotZone"){
            if(
                lines[0] !== null &&
                lines[0] !== undefined 
            ) {
                x = e.pointer.x;
                y = e.pointer.y;
                lines[lineCounter - 1].set({
                x2: x,
                y2: y
                });
                canvas.renderAll();
            }
        }
    }
    //鼠标按下事件
    const mouseDownFun = e => {
        console.log(ctxSize);
        if(penType === "hotZone"){
            //获取当前点击的x，y坐标
            mouseFrom.x = e.pointer.x
            mouseFrom.y = e.pointer.y
            let a = {}
                a["x"] = mouseFrom.x
                a["y"] = mouseFrom.y
            roofPoints.push(a)
            let points = [a.x, a.y, a.x, a.y]
            lines.push(
                new fabric.Line(points,{
                    strokeWidth:ctxSize,
                    selectable:false,
                    stroke:ctxColor
                })
            )
            console.log(lines);
            canvas.add(lines[lineCounter])
            lineCounter++  
        }
        if(penType === "text"){
            textBox = new fabric.Textbox( "", {
                left: e.pointer.x,
                width: 150,
                top: e.pointer.y,
                borderColor: ctxColor,
                fill: ctxColor,
                fontSize: ctxSize * 2,
                hasControls: false
            })
            canvas.add(textBox)
            textBox.enterEditing()
            textBox.hiddenTextarea.focus()
        }
    }
    //鼠标点击抬起事件
    const mouseUpFun = e => {
        console.log(e);
    }
    //文字大小设置
    const editFontSize = (fontSize) => {
        ctxSize = fontSize 
        setCtxSize(fontSize)
    }
    //颜色改变
    const ColorUpdate = (color) => {
        ctxColor = color
        setCtxColor(color) 
    }
    return (
        <div>
            <Header changePenType={changePenType}/>
            <Canvans hotRef={hotRef}/>
            <Drawer
                title="样式编辑"
                placement="right"
                closable={true}
                mask={false}
                onClose={onClose}
                visible={visible}
                width={300}
            >
                <StyleSet color={ctxColorPro} editFontSize={editFontSize} fontSzie={ctxSizePro} ColorUpdate={ColorUpdate}  onClose={onClose} />
            </Drawer>
        </div>
    )
}
