import React from 'react';
import PropTypes from 'prop-types';
import RcTooltip from 'rc-tooltip';
// import * as RcTooltip from 'antd';
import { placements as rcPlacements } from 'rc-tooltip/lib/placements';
export default class Tooltip extends React.Component {
  constructor(props) {
    super(props)
  }
  getPlacements = () => {
    const { builtinPlacements, arrowPointAtCenter } = this.props
    const arrowWidth = 5, horizontalArrowShift = 12, verticalArrowShift = 8
    let placements = rcPlacements
    if(arrowPointAtCenter) {
      placements = {
        left: {
          points: ['cr', 'cl'],
          offset: [-4, 0],
        },
        right: {
          points: ['cl', 'cr'],
          offset: [4, 0],
        },
        top: {
          points: ['bc', 'tc'],
          offset: [0, -4],
        },
        bottom: {
          points: ['tc', 'bc'],
          offset: [0, 4],
        },
        topLeft: {
          points: ['bl', 'tc'],
          offset: [-(horizontalArrowShift + arrowWidth), -4],
        },
        leftTop: {
          points: ['tr', 'cl'],
          offset: [-4, -(verticalArrowShift + arrowWidth)],
        },
        topRight: {
          points: ['br', 'tc'],
          offset: [horizontalArrowShift + arrowWidth, -4],
        },
        rightTop: {
          points: ['tl', 'cr'],
          offset: [4, -(verticalArrowShift + arrowWidth)],
        },
        bottomRight: {
          points: ['tr', 'bc'],
          offset: [horizontalArrowShift + arrowWidth, 4],
        },
        rightBottom: {
          points: ['bl', 'cr'],
          offset: [4, verticalArrowShift + arrowWidth],
        },
        bottomLeft: {
          points: ['tl', 'bc'],
          offset: [-(horizontalArrowShift + arrowWidth), 4],
        },
        leftBottom: {
          points: ['br', 'cl'],
          offset: [-4, verticalArrowShift + arrowWidth],
        },
      }
    }
    return placements
  }
  render() {
    return (
      <RcTooltip 
        builtinPlacements={this.getPlacements()}
        {...this.props}
      />
    )
  }
}
Tooltip.displayName = 'dh-tooltip';
Tooltip.propTypes = RcTooltip.propTypes;

Tooltip.defaultProps = Object.assign(RcTooltip.defaultProps, {
  prefixCls: 'dh-tooltip',
  mouseLeaveDelay: 0
});
