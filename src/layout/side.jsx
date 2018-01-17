//polyfill
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery) => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {
            },
            removeListener() {
            },
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

import React, { Component } from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import PropTypes from 'prop-types';
import Icon from '../icon';

const dimensionMap = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
};

const generateId = (() => {
    let i = 0;
    return (prefix = '') => {
        i += 1;
        return `${prefix}${i}`;
    }
})();

export default class Sider extends Component {
    static __ANT_LAYOUT_SIDER = true;

    static childContextTypes = {
        siderCollapsed: PropTypes.bool,
        collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    };

    static contextTypes = {
        siderHook: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.uniqueId = generateId('ant-sider-');
        let matchMedia;
        if (typeof window !== 'undefined') {
            matchMedia = window.matchMedia;
        }
        if (matchMedia && props.breakpoint && props.breakpoint in dimensionMap) {
            this.mql = matchMedia(`(max-width: ${dimensionMap[props.breakpoint]}`);
        }
        let collapsed;
        if ('collapsed' in props) {
            collapsed = props.collapsed;
        } else {
            collapsed = props.defaultCollapsed;
        }
        this.state = {
            collapsed,
            below: false,
        };
    }

    componentDidMount() {
        if (this.mql) {
            this.mql.addListener(this.responsiveHandler);
            this.responsiveHandler(this.mql);
        }
        
        if (this.context.siderHook) {
            this.context.siderHook.addSider(this.uniqueId);
        }
    }
    componentWillReceiveProps(nextProps) {
        if ('collapsed' in nextProps) {
            this.setState({
                collapsed: nextProps.collapsed
            })
        }
    }
    getChildContext() {
        return {
            siderCollapsed: this.state.collapsed,
            collapsedWidth: this.props.collapsedWidth,
        };
    }
    setCollapsed = (collapsed, type) => {
        if (!('collapsed') in this.props) {
            this.setState({
                collapsed,
            });
        }
        const { onCollapse } = this.props;
        if (onCollapse) {
            onCollapse(collapsed, type);
        }
    }

    responsiveHandler = (mql) => {
        this.setState({ below: mql.matches });
        if (this.state.collapsed !== mql.matches) {
            this.setCollapsed(mql.matches, 'responsive');
        }
    }

    toggle = () => {
        const collapsed = !this.state.collapsed;
        this.setCollapsed(collapsed, 'clickTrigger');
    }

    belowShowChange = () => {
        this.setState({ belowShow: !this.state.belowShow });
    }

    render() {
        const { prefixCls, className,
            collapsible, reverseArrow, trigger, style, width, collapsedWidth,
            ...others,
        } = this.props;
        const divProps = omit(others, ['collapsed', 
            'defaultCollapsed', 'onCollapse', 'breakpoint']);
        const siderWidth = this.state.collapsed ? collapsedWidth : width;
        const zeroWidthTrigger = collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px' ? (
            <span onClick={this.toggle} className={`${prefixCls}-zero-width-trigger`}>
                <Icon type="bars"/>
            </span>
        ) : null;
        const iconObj = {
            'expanded': reverseArrow ? <Icon type="right"/> : <Icon type="left"/>,
            'collapsed': reverseArrow ? <Icon type="left"/> : <Icon type="right"/>,
        };
        const status = this.state.collapsed ? 'collapsed' : 'expanded';
        const defaultTrigger = iconObj[status];
        const triggerDom = (
            trigger !== null ?
            zeroWidthTrigger || (
              <div className={`${prefixCls}-trigger`} onClick={this.toggle} style={{ width: siderWidth }}>
                {trigger || defaultTrigger}
              </div>
            ) : null
        );
        const divStyle = {
            ...style,
            flex: `0 0 ${siderWidth}px`,
            maxWidth: `${siderWidth}px`,
            minWidth: `${siderWidth}px`,
            width: `${siderWidth}px`,
        };
        const siderCls = classNames(className, prefixCls, {
            [`${prefixCls}-collapsed`]: !!this.state.collapsed,
            [`${prefixCls}-has-trigger`]: !!trigger,
            [`${prefixCls}-below`]: !!this.state.below,
            [`${prefixCls}-zero-width`]: siderWidth === 0 || siderWidth === '0' || siderWidth === '0px',
        });
        return (
            <div className={siderCls} {...divProps} style={divStyle}>
                <div className={`${prefixCls}-children`}>{this.props.children}</div>
                {collapsible || (this.state.below && zeroWidthTrigger) ? triggerDom : null}
            </div>
        );
    }
}

Sider.defaultProps = {
    prefixCls: 'ant-layout-sider',
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 80,
    style: {},
}