import React, { Component } from 'react';
import PropTypes from 'prop-types';
import warning from '../_util/warning';
import Tooltip from '../tooltip';

export default class Popover extends Component {

    getPopupDomNode() {
        return this.tooltip.getPopupDomNode();
    }

    getOverlay() {
        const { title, prefixCls, content } = this.props;
        warning(
            !('overlay' in this.props),
            'Popover[overlay] is removed, please use Popover[content] instead, ' + 
            'see: https://u.ant.design/popover-content', 
        );
        return (
            <div>
                {title && <div className={`${prefixCls}-title`}>{ title }</div>}
                <div className={`${prefixCls}-inner-content`}>
                    { content }
                </div>
            </div>
        );
    }

    saveTooltip = (node) => {
        this.tooltip = node;
    }

    render() {
        const props = { ...this.props };
        delete props.title;
        return (
            <Tooltip
                { ...props }
                ref={this.saveTooltip}
                overlay={this.getOverlay()}
            ></Tooltip>
        )
    }
}

Popover.propTypes = {
    prefixCls: PropTypes.string,
    overlayClassName: PropTypes.string,
    overlayStyle: PropTypes.object,
    placement: PropTypes.oneOf([
            'top', 'left', 'right', 'bottom', 'topLeft', 'topRight',
            'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 
            'rightTop', 'rightBottom']),
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    trigger: PropTypes.oneOf(['hover', 'focus', 'click']),
    transitionName: PropTypes.string,
};

Popover.defaultProps = {
    prefixCls: 'ant-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseEnterDelay: 0.1,
    overlayStyle: {},
}