import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import {Slider} from "antd"
import './color.scss'
 
class StyleEdit extends React.Component {
    state = {
        displayColorPicker: false,
        color: {
            r: '0',
            g: '0',
            b: '0',
            a: '100',
        },
        nowColor:'#000',
        colors: [
            "#000",
            "#2c3e50",
            "#8e44ad",
            "#3498db",
            "#2ecc71",
            "#f39c12",
            "#16a085",
            "#e74c3c"
        ]
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        console.log(color.hex);
        this.props.ColorUpdate(color.hex)
        this.setState({ color: color.rgb })
    };
    changColorData = (index) => {
        this.props.ColorUpdate(this.state.colors[index])
        setTimeout(() => {
            this.setState({ nowColor: this.state.colors[index] })
        }, 100);
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps.color,prevState);
        if(prevProps.color !== this.props.color){
            this.nowColorIndex()
        }
    }

    nowColorIndex = () => {
        let nowIndex = -2
        this.state.colors.forEach( ( element, index ) => {
            if( element === this.props.color ){
                nowIndex =  index
            }
        });
        return nowIndex
    }
    onAfterChange = (params) => {
        this.props.editFontSize(params)
    }

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          marginTop:'20px'
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        curColor:{
            display: 'flex',
            alignItems: 'center',
            marginTop:'20px',
            fontWeight:600
        },
        dotCcolor:{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: `${this.props.color}`,
            marginLeft: '10px',
        },
        sizeBox:{
            marginTop:'20px',
            fontWeight:600
        },
      },
    });

    return (
        <>
            {/* <div>
                <Button type="primary" onClick={this.props.colroPreservation}>保存</Button>
                <Button onClick={this.props.onClose} style={{marginLeft:5,marginRight:5}} >取消</Button>
            </div> */}
            <div style={styles.curColor}>
                <span>当前颜色：</span>
                <div style={styles.dotCcolor}></div>
            </div>
            <div style={styles.sizeBox}>
                <span>颜色选择：</span>
            </div>
            <div className='defaultColorBox'>
                {
                    this.state.colors.map((item,index) => {
                        return (
                            <div 
                                className={`color-item ${this.nowColorIndex() === index ? 'action' : null}`}
                                key={index}
                                style={{backgroundColor:`${item}`}} 
                                onClick={() => this.changColorData(index)}
                            ></div>
                        )
                    })
                }
            </div>
            <div style={{display:'inline',fontWeight:600,height:14,lineHeight:'14px'}}>颜色选择器：</div>
            <div style={{display:'inline'}}>   
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.handleClose }/>
                <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                </div> : null }

            </div>
            <div style={styles.sizeBox}>
                <span>画笔大小：</span>
                <Slider defaultValue={this.props.fontSzie} max={30} min={0} onAfterChange={this.onAfterChange} />
            </div>
        </>
    )
  }
}

export default StyleEdit