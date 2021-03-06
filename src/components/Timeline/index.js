import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames'
import TimelineItem from './timeline-item'
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => {
    return {
        root: {
            paddingTop: '10px',
            paddingLeft: 5,
            textAlign: 'left'
        },

    }
};

@withStyles(styles, {name: 'MuiTimelineAnt'})
export default class app extends Component {

    static defaultProps = {
        pending: false,
        // pendingDot: <Icon type={'loading'}/>,
        pendingDot: <CircularProgress style={{top:-4}}/>
    }

    render() {
        const props = this.props
        const {classes} = this.props
        //获取幽灵节点的值
        var pendingNode = (typeof props.pending) === 'boolean' ? null : props.pending
        //生成幽灵节点
        var pendingItem = !!props.pending ? React.createElement(
            TimelineItem,
            {pending: !!props.pending, dot: props.pendingDot, pendingNode: true},
            pendingNode
        ) : null;

        //生成除幽灵节点的其他item
        var Items = React.Children.toArray(this.props.children).filter(function (item) {
            return !!item;
        });
        var item = React.Children.map(Items, function (ele, idx) {
            return React.cloneElement(ele, {
                last: idx === React.Children.count(Items) - 1,
                pending: !!props.pending
            });
        })
        return React.createElement(
            'div',
            {className: classnames(classes.root, props.className)},
            item,
            pendingItem
        )

    }
}
app.propTypes = {
    className: PropTypes.string,
    pending: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.element,
    ]),
    pendingDot: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ])
};
app.Item = TimelineItem