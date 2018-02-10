import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);

const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};

export default class Col extends Component {
    render() {
        const props = this.props;
        const { span, order, offset, push, pull, className, children, prefixCls = 'ant-col', ...others } = props;
        let sizeClassObj = {};
        responsiveArray.forEach(size => {
            let sizeProps = {};
            if (typeof props[size] === 'number') {
                sizeProps.span = props[size];
            } else if (typeof props[size] === 'object') {
                sizeProps = props[size] || {};
            }

            delete others[size];

            sizeClassObj = {
                ...sizeClassObj,
                [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
                [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
                [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
                [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
                [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
            };
        });
        const classes = classNames({
            [`${prefixCls}-${span}`]: span !== undefined,
            [`${prefixCls}-order-${order}`]: order,
            [`${prefixCls}-offset-${offset}`]: offset,
            [`${prefixCls}-push-${push}`]: push,
            [`${prefixCls}-pull-${pull}`]: pull,
        }, className, sizeClassObj);

        return <div {...others} className={classes}>{children}</div>
    }
}
Col.propTypes = {
    span: stringOrNumber,
    order: stringOrNumber,
    offset: stringOrNumber,
    push: stringOrNumber,
    pull: stringOrNumber,
    className: PropTypes.string,
    children: PropTypes.node,
    xs: objectOrNumber,
    sm: objectOrNumber,
    md: objectOrNumber,
    lg: objectOrNumber,
    xl: objectOrNumber,
};
