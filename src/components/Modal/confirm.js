import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Icon from '../Icon'
import Modal from './index';
import {MuiThemeProvider} from '@material-ui/core/styles';
import style from '../Style'
import ActionButton from './ActionButton';
import classnames from 'classnames'

const styles = theme => {
    return{
        success: {
            color:'#52c41a'
        },
        warn: {
            color: '#faad14'
        },
        info: {
            color: '#1890ff'
        },
        error: {
            color: '#f5222d'
        },
        confirm:{
            color: '#faad14'
        },
        confirmIcon:{
            fontSize: '22px',
            marginRight: '16px',
            float: 'left',
            lineHeight:1
        },
        confirmTitle:{
            color: 'rgba(0,0,0,.85)',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '22px',
            display: 'block',
            overflow: 'auto'
        },
        confirmContent:{
            marginLeft: '38px',
            fontSize: '14px',
            color: 'rgba(0,0,0,.65)',
            marginTop: '8px'
        },
        confirmBtns:{
            marginTop: '24px',
            marginBottom:'10px',
            float: 'right'
        }
    }};
@withStyles(styles, {name: 'MuiConfirmModalAnt'})
export class ConfirmModal extends Component {
    static defaultProps={
        iconType:'question-circle',
        okType:'Primary',
        okText:'Confirm',
        cancelText:'Cancel',
        width:416,
        mask:true,
        maskClosable:false,
        disableEscapeKeyDown:true,
        className:'',
        onCancel:()=>{},
        onOk:()=>{}
    }
    render(){
        const {classes,afterClose,visible,title,content,close,iconType,type,okType,okText,cancelText,mask,maskClosable,width,className,onCancel,onOk,disableEscapeKeyDown,rootClassName,onRendered} = this.props;
        const okHide = ('okHide' in this.props) ? this.props.okHide : true;
        const okCancel = ('okCancel' in this.props) ? this.props.okCancel : true;
        const OkButton = okHide && (
            <ActionButton style={{marginLeft:'10px'}} type={okType} actionFn={onOk} closeModal={close} autoFocus>
                {okText}
            </ActionButton>
        );
        const cancelButton = okCancel && (
                <ActionButton actionFn={onCancel} closeModal={close}>
                    {cancelText}
                </ActionButton>
            );
        return (
            <Modal
                title=""
                header={null}
                footer={null}
                visible={visible}
                width={width}
                onCancel={close}
                afterClose={afterClose}
                mask={mask}
                maskClosable={maskClosable}
                disableEscapeKeyDown={disableEscapeKeyDown}
                closable={false}
                wrapClassName={className}
                rootClassName={rootClassName}
                onRendered={onRendered}
            >
                <div>
                    <span className={classnames(classes.confirmIcon,classes[type])}><Icon type={iconType} /></span>
                    <span className={classes.confirmTitle}>{title}</span>
                    <div className={classes.confirmContent}>{content}</div>
                </div>
                <div className={classes.confirmBtns}>
                    {OkButton}
                    {cancelButton}
                </div>
            </Modal>
        );
    }
}
export default function confirm(config) {
    let div = document.createElement('div');
    document.body.appendChild(div);

    function close(...args) {
        render({ ...config, close, visible: false, afterClose: destroy.bind(this, ...args) });
    }

    function destroy(...args) {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    function render(props) {
        ReactDOM.render(<MuiThemeProvider theme={style.theme}><ConfirmModal {...props} /></MuiThemeProvider>, div);
    }

    render({ ...config, visible: true, close });

    return {
        destroy: close,
    };
}
ConfirmModal.propTypes = {
    cancelText:PropTypes.string,//取消按钮文字
    title:PropTypes.any,//标题
    content:PropTypes.any,//内容
    className:PropTypes.string,//容器类名
    iconType:PropTypes.string,//图标 Icon 类型
    maskClosable:PropTypes.bool,//点击蒙层是否允许关闭
    okText:PropTypes.string,//确认按钮文字
    okType:PropTypes.string,//确认按钮类型
    width:PropTypes.any,//宽度,
    onCancel:PropTypes.func,//点击取消按钮触发回调
    onOk:PropTypes.func,//点击确定按钮触发回调

}
