import React from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import RcSlider, { Range, Handle } from 'rc-slider';
import classnames from 'classnames';
import { Tooltip } from '../index';
const RcRange = Range;
const RcHandle = Handle;


class Slider extends React.Component {
  static propTypes = {
    overlayClassName: PropTypes.string
  }
  static defaultProps = {
    prefixCls: 'dh-slider',
    tooltipPrefixCls: 'dh-slider-tooltip',
    tipFormatter: (value) => {
      return value.toString()
    }
  }
  constructor(props) {
    super(props);
  }

  renderHandle = (value, index) => {
    const { tipFormatter, overlay } = this.props;
    if (Array.isArray(overlay)) {
      return overlay[index];
    }
    if (overlay) return overlay;
    return tipFormatter ? tipFormatter(value) : ''
  }

  renderPlacement = (index) => {
    const { range, placement } = this.props;
    if (range) {
      if (is.array(placement) && is.not.empty(placement)) {
        return placement[index];
      } else {
        return index == 0 ? 'topLeft' : 'bottomRight';
      }
    } else {
      return is.string(placement) ? placement : 'top'
    }
  }

  handleTooltip = ({ value, dragging, index, ...restProps }) => {
    const { trigger, tooltipPrefixCls, visible, auto, overlayClassName } = this.props;
    if (auto) {
      return (
        <Tooltip
          overlayClassName={classnames({[`${overlayClassName}`]: overlayClassName})}
          prefixCls={tooltipPrefixCls}
          overlay={this.renderHandle(value,index)}
          placement={this.renderPlacement(index)}
          key={index}
          visible={visible}
          trigger={trigger}
        >
          <RcHandle
            {...restProps}
          />
        </Tooltip>
      )
    } else {
      return (
        <Tooltip
          overlayClassName={classnames({[`${overlayClassName}`]: overlayClassName})}
          prefixCls={tooltipPrefixCls}
          overlay={this.renderHandle(value,index)}
          placement={this.renderPlacement(index)}
          key={index}
          trigger={trigger}
        >
          <RcHandle
            {...restProps}
          />
        </Tooltip>
      )
    }

  }
  render() {
    const { range, reverse, ...restProps } = this.props;
    if (range) {
      return <RcRange className={classnames({'dh-slider-reverse': reverse})}  {...restProps} handle={this.handleTooltip} />
    }
    return <RcSlider className={classnames({'dh-slider-reverse': reverse})} {...restProps} handle={this.handleTooltip} />
  }
}

export default Slider;
