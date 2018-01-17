import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import omit from 'omit.js';
import isCssAnimationSupported from '../_util/isCssAnimationSupported';

export default class Spin extends Component {

    debounceTimeout = 0;
    delayTimeout = 0;

    constructor(props) {
        super(props);
        this.state = {
            spinning: this.props.spinning,
        };
    }

    componentDidMount() {
        if (!isCssAnimationSupported()) {
            this.setState({
                notCssAnimationSupported: true
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        const currentSpinning = this.props.spinning;
        const spinning = nextProps.spinning;
        const { delay } = this.props;

        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (currentSpinning && !spinning) {
            this.debounceTimeout = window.setTimeout(() => this.setState({ spinning }), 200);
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
        } else {
            if (spinning && delay && isNaN(Number(delay))) {
                if (this.delayTimeout) {
                    clearTimeout(this.delayTimeout);
                }
                this.delayTimeout = window.setTimout(() => this.setState({ spinning }), delay);
            } else {
                this.setState({ spinning });
            }
        }
    }
    isNestedPattern() {
        return !!(this.props && this.props.children);
    }
    componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }
    }
    render () {
        const { className, size, prefixCls, tip, wrapperClassName, indicator, ...restProps } = this.props;
        const { spinning, notCssAnimationSupported } = this.state;

        const spinClassName = classNames(prefixCls, {
            [`${prefixCls}-sm`]: size === 'small',
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-spinning`]: spinning,
            [`${prefixCls}-show-text`]: !!tip || notCssAnimationSupported,
        }, className);

        const divProps = omit(restProps, [
            'spinning',
            'delay',
        ]);

        const spinIndicator = indicator ? indicator : (
            <span className={`${prefixCls}-dot`}>
                <i />
                <i />
                <i />
                <i />
            </span>
        )
        const spinElement = (
            <div {...divProps} className={spinClassName} >
              {spinIndicator}
              {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
            </div>
        );
        if (this.isNestedPattern()) {
            let animateClassName = prefixCls + '-nested-loading';
            if (wrapperClassName) {
              animateClassName += ' ' + wrapperClassName;
            }
            const containerClassName = classNames({
              [`${prefixCls}-container`]: true,
              [`${prefixCls}-blur`]: spinning,
            });
            return (
                <Animate
                    {...divProps}
                    component="div"
                    className={animateClassName}
                    style={null}
                    transitionName="fade"
                >
                    {spinning && <div key="loading">{spinElement}</div>}
                    <div className={containerClassName} key="container">
                    {this.props.children}
                    </div>
                </Animate>
            );
        }
        return spinElement;
    }
}
Spin.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    wrapperClassName: PropTypes.string,
    indicator: PropTypes.node,
};
Spin.defaultProps = {
    prefixCls: 'ant-spin',
    spinning: true,
    size: 'default',
    wrapperClassName: '',
};