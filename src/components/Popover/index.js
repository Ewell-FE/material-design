import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import omit from 'omit.js';
import _ from 'lodash';

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit * 4,
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
    popover: {
        pointerEvents: 'none',
    },
    paper:{
        overflowX:'initial',
        overflowY:'initial',
        boxShadow: '0 2px 8px rgba(0,0,0,.15)',
        borderRadius: '4px'
    },
    arrow:{
        background: '#fff',
        width: '8px',
        height: '8px',
        transform: 'rotate(45deg)',
        position: 'absolute',
        bottom: '-4px',
        left: '16px',
        display: 'block',
        borderColor: 'transparent',
        borderStyle: 'solid',
    },
    title:{
        minWidth: '177px',
        margin: 0,
        padding: '5px 16px 4px',
        minHeight: '32px',
        borderBottom: '1px solid #e8e8e8',
        color: 'rgba(0,0,0,.85)',
        fontWeight: '500'
    },
    content:{
        padding: '12px 16px',
        color: 'rgba(0,0,0,.65)'
    },
    arrowXCenter:{
        left:'50%',
        transform: 'translateX(-50%) rotate(45deg)',

    },
    arrowYCenter:{
        top:'50%',
        transform: 'translateY(-50%) rotate(45deg)',

    },
    arrowXLeft:{
        left:'initial',
        right:'-4px'
    },
    arrowYLeft:{
        right:'initial',
        left:'16px'
    },
    arrowXRight:{
        right:'initial',
        left:'-4px'
    },
    arrowYRight:{
        left:'initial',
        right:'16px'
    },
    arrowXTop:{
        top:'initial',
        bottom:'-4px'
    },
    arrowYTop:{
        bottom:'initial',
        top:'16px'
    },
    arrowXBottom:{
        bottom:'initial',
        top:'-4px'
    },
    arrowYBottom:{
        top:'initial',
        bottom:'16px'
    },
    marginLeft:{
        marginLeft:'-8px'
    },
    marginRight:{
        marginLeft:'8px'
    },
    marginTop:{
        marginTop:'-8px'
    },
    marginBottom:{
        marginTop:'8px'
    }
});
const positions={
    'topLeft':['top','bottom','left','left'],
    'top':['top','bottom','center','center'],
    'topRight':['top','bottom','right','right'],
    'rightTop':['top','top','right','left'],
    'right':['center','center','right','left'],
    'rightBottom':['bottom','bottom','right','left'],
    'bottomRight':['bottom','top','right','right'],
    'bottom':['bottom','top','center','center'],
    'bottomLeft':['bottom','top','left','left'],
    'leftBottom':['bottom','bottom','left','right'],
    'left':['center','center','left','right'],
    'leftTop':['top','top','left','right']
};
@withStyles(styles, {name: 'MuiPopoverAnt'})
export default class Popver extends Component {
    static defaultProps={
        trigger:'hover',
        placement:'top',
        anchorReference:'anchorEl',
        anchorPosition:{'top':200,'left':400},
        arrow:true,
        wrapperContentStyle:{},
        clickClose:false
    }
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            el:null
        }
    }
    handleOpen=()=>{
        this.setState({visible:true})
        this.props.onVisibleChange&&this.props.onVisibleChange(true)
    }
    handleClose=()=>{
        this.setState({visible:false})
        this.props.onVisibleChange&&this.props.onVisibleChange(false)
    }
    dom=null;

    componentDidMount(){
        this.props.withRef && this.props.withRef(this)
    }

    render() {
        const {trigger,children,classes,placement,title,content,anchorReference,anchorPosition,container,arrow,wrapperContentStyle,clickClose} = this.props;
        const visible=this.props.visible===undefined?this.state.visible:this.props.visible;
        let otherProps = omit(this.props, ['visible','children', 'trigger', 'classes', 'placement', 'title', 'content', 'anchorReference','anchorPosition','container','arrow','wrapperContentStyle','clickClose'])

        const arrowClassName=classnames(classes['arrow'], {
            [classes['arrowXCenter']]:placement==='top'||placement==='bottom',
            [classes['arrowYCenter']]:placement==='left'||placement==='right',
            [classes['arrowXLeft']]:placement.includes('left'),
            [classes['arrowXRight']]:placement.includes('right'),
            [classes['arrowXTop']]:placement.includes('top'),
            [classes['arrowXBottom']]:placement.includes('bottom'),
            [classes['arrowYLeft']]:placement.includes('Left'),
            [classes['arrowYRight']]:placement.includes('Right'),
            [classes['arrowYTop']]:placement.includes('Top'),
            [classes['arrowYBottom']]:placement.includes('Bottom')
        });
        const paper=classnames(classes['paper'], {
            [classes['marginLeft']]:placement.includes('left'),
            [classes['marginRight']]:placement.includes('right'),
            [classes['marginTop']]:placement.includes('top'),
            [classes['marginBottom']]:placement.includes('bottom'),
        });
        const popoverClassName=classnames('', {
            [classes['popover']]:trigger==='hover'
        });
        const defaultChildren={
            onClick:  trigger==='click'?this.handleOpen:()=>{_.isFunction(_.get(children,'props.onClick'))&&_.get(children,'props.onClick')()},
            onMouseEnter:trigger==='hover'?this.handleOpen:()=>{},
            onMouseLeave:trigger==='hover'?this.handleClose:()=>{}
        }
        if (_.isFunction(children.type)){
            Object.assign(defaultChildren,{
                withRef:(dom)=>this.dom=dom,
            })
        }else{
            Object.assign(defaultChildren,{
                ref:(dom)=>this.dom=dom,
            })
        }
        return(
            <React.Fragment>
                {
                    React.cloneElement(children, {
                        ...defaultChildren,
                    })
                }
                <Popover
                    open={visible}
                    className={popoverClassName}
                    anchorEl={this.dom}
                    anchorReference={anchorReference}
                    anchorPosition={{ top: anchorPosition.top, left: anchorPosition.left }}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: positions[placement][0],
                        horizontal:positions[placement][2],
                    }}
                    transformOrigin={{
                        vertical: positions[placement][1],
                        horizontal:positions[placement][3],
                    }}
                    classes={{paper}}
                    container={container}
                    {...otherProps}
                >
                    {arrow&&<div className={arrowClassName}></div>}
                    {
                        title&&
                        <div className={classes.title}>
                            {title}
                        </div>
                    }
                    <div className={classes.content} style={{...wrapperContentStyle}} onClick={()=>{clickClose&&this.handleClose()}}>
                        {content}
                    </div>
                </Popover>
            </React.Fragment>

        )

    }
}
Popver.propTypes = {
    placement: PropTypes.oneOf(['topLeft','top','topRight','leftTop','rightTop','left','right',
        'leftBottom','rightBottom','bottomLeft','bottom','bottomRight']), //位置类型
    trigger:PropTypes.oneOf(['click','hover']), //触发方式
    wrapperContentStyle:PropTypes.object, //内容行内样式
    title:PropTypes.any, //标题
    content:PropTypes.any, //内容
    visible:PropTypes.bool, //是否显示Popover
}


