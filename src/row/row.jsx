let enquire;
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery) => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {
            },
            removeListener(){

            }
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
    enquire = require('enquire.js')
}

import React, { Component } from 'react';
import { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};

export default class Row extends Component {

    constructor() {
        super();
        this.state = {
            screens: {}
        }
    }

    componentDidMount() {
        Object.keys(responsiveMap)
            .map((screen) => enquire.register(responsiveMap[screen], {
                match: () => {
                    if (typeof this.props.gutter !== 'object') {
                        return;
                    }
                    this.setState((prevState) => ({
                        screens: {
                            ...prevState.screens,
                            [screen]: true,
                        },
                    }));
                },
                unmatch: () => {
                    if (typeof this.props.gutter !== 'object') {
                        return;
                    }
                    this.setState((prevState) => ({
                        screens: {
                            ...prevState.screens,
                            [screen]: false,
                        },
                    }));
                },
                destroy() {},
            }, 
        ));
        
    }

    componentWillUnmount() {
        Object.keys(responsiveMap)
            .map((screen) => enquire.unregister(responsiveMap[screen]));
    }
    getGutter() {
        const { gutter } = this.props;
        if (typeof gutter === 'object') {
            for (let i = 0; i <= responsiveArray.length; i ++) {
                const breakpoint = responsiveArray[i];
                if (this.state.screens[breakpoint] && gutter[breakpoint] !== undefined) {
                    return gutter[breakpoint];
                }
            }
        }
        return gutter;
    }

    render() {
        const {
            type, justify, align, className, style, children,
            prefixCls = 'ant-row', ...others
        } = this.props;

        const gutter = this.getGutter();
        const classes = classNames({
            [prefixCls]: !type,
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${type}-${justify}`]: type && justify,
            [`${prefixCls}-${type}-${align}`]: type && align,
        }, className);
        const rowStyle = Number(gutter) > 0 ? {
            marginLeft: Number(gutter) / -2,
            marginRight: Number(gutter) / -2,
            ...style,
        } : style;
        const cols = Children.map(children, (col) => {
            if (!col) {
                return null;
            }
            if (col.props && Number(gutter) > 0) {
                return cloneElement(col, {
                    style: {
                        paddingLeft: Number(gutter) / 2,
                        paddingRight: Number(gutter) / 2,
                        ...col.props.style,
                    },
                });
            }
            return col
        });
        const otherProps = { ...others };
        delete otherProps.gutter;
        return (
            <div {...otherProps} className={classes} style={rowStyle}>{cols}</div>
        )
    }
}

Row.propTypes = {
    type: PropTypes.string,
    align: PropTypes.string,
    justify: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    prefixCls: PropTypes.string
}
Row.defaultProps = {
    gutter: 0
}