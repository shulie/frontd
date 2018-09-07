import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';
import ActionButton from './action_button';
import Dialog from './modal';

export default function confirm(config) {
  const props = config;
  const prefixCls = props.prefixCls || 'dh-modal';
  let div = document.createElement('div');
  document.body.appendChild(div);

  let width = props.width || 360;
  let style = props.style || {};

  const maskClosable = props.maskClosable === undefined ? true : props.maskClosable;

  function close(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args && args.length &&
      args.some(param => param && param.triggerCancel);
    if (props.onCancel && triggerCancel) {
      props.onCancel(...args);
    }
  }

  let body = (
    <div className={`${prefixCls}-confirm-body`}>
      {
        props.iconType && <Icon type={props.iconType} style={{color: '#ffbf00', marginRight: 8}} />
      }
      <span className={`${prefixCls}-content`}>{props.content}</span>
    </div>
  );

  let footer = null;
  if (props.onCancel) {
    footer = (
      <div className={`${prefixCls}-footer-wapper`}>
        <ActionButton actionFn={props.onOk} closeModal={close} autoFocus>
          {props.okText || '确定'}
        </ActionButton>
        <ActionButton actionFn={props.onCancel} closeModal={close}>
          {props.cancelText || '取消'}
        </ActionButton>
      </div>
    );
  } else {
    footer = (
      <div className={`${prefixCls}-footer-wapper`}>
        <ActionButton actionFn={props.onOk} closeModal={close} autoFocus>
          {props.okText || '确定'}
        </ActionButton>
      </div>
    );
  }

  const classString = classNames(prefixCls, {
    [`${prefixCls}-${props.type}`]: true,
  }, props.className);
  ReactDOM.render(
    <Dialog
      className={classString}
      onCancel={close.bind(this, { triggerCancel: true })}
      visible
      title={props.title}
      transitionName="zoom"
      footer={footer}
      maskTransitionName="fade"
      maskClosable={maskClosable}
      style={style}
      width={width}
    >
      {body}
    </Dialog>
    , div);

  return {
    destroy: close,
  };
}
