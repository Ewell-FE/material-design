import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => {
    return {
        root: {
            verticalAlign: 'middle',
            position: 'relative',
            fontSize:theme.typography.fontSize,
            padding: 0,
            color: theme.palette.text.primary,
            // background: '#e8e8e8',
        },
        horizontal: {
            display: 'block',
            height: '1px',
            width: '100%',
            margin: '24px 0',
            clear: 'both',
            borderTop:'1px solid #e8e8e8'
        },
        vertical: {
            margin: '0 8px',
            display: 'inline-block',
            height: '.9em',
            width: '1px',
            verticalAlign: 'middle',
            position: 'relative',
            top: '-.06em',
        },
        horizontalText: {
            display: 'table',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            background: 'transparent',
            fontWeight: 500,
            color: 'rgba(0,0,0,.85)',
            fontSize: '16px',
            margin: '16px 0',
            '&:before,&:after': {
                content: '""',
                display: 'table-cell',
                position: 'relative',
                top: '50%',
                width: '50%',
                borderTop: '1px solid #e8e8e8',
                '-webkit-transform': 'translateY(50%)',
                '-ms-transform': 'translateY(50%)',
                transform: 'translateY(50%)',
            }
        },
        solid:{
            '&:before,&:after': {
                borderTopStyle:'solid'
            }
        },
        dashed: {
            '&:before,&:after': {
                borderTopStyle:'dashed'
            }
        },
        dotted:{
            '&:before,&:after': {
                borderTopStyle:'dotted'
            }
        },
        text: {
            display: 'inline-block',
            padding: '0 24px',
        },
        leftText:{
            '&:before':{
                width:'5%'
            },
            '&:after':{
                width:'95%'
            }
        },
        rightText:{
            '&:before':{
                width:'95%'
            },
            '&:after':{
                width:'5%'
            }
        },
        centerText:{}
    }
}

@withStyles(styles, {name: 'MuiDividerAnt'})
class app extends Component {
    static defaultProps = {
        type: 'horizontal',
        orientation: 'center',
        lineType:'solid',
        dashed: false
    }

    render() {
        const {children, className, style, classes, type,orientation,lineType} = this.props
        let classProps = classnames(className, classes.root, classes[`${type}`], children && classes[`${type}Text`],
            classes[`${lineType}`],classes[`${orientation}Text`])
        return (
            <div className={classProps} style={{...style,borderTopStyle:lineType}}>
                {children && <span className={classes.text}>{children}</span>}
            </div>
        )
    }
}

app.propTypes = {
    type: PropTypes.oneOf(['horizontal', 'vertical']), //水平还是垂直类型
    orientation: PropTypes.oneOf(['left', 'right', 'center']), //分割线标题的位置
    lineType:PropTypes.oneOf(['solid','dotted','dashed']),//分割线类型
    children:PropTypes.node, //孩子节点
    className:PropTypes.string, //类名
    style:PropTypes.object, //行内样式
}
export default app