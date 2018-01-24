import React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';

let key = 1;
const defaultDuration = 2;//间隔时间(秒)
let multipleInstance = true;
let messageInstance;

const icons = {
  info: 'warning',
  success: 'success',
  error: 'error',
  warning: 'warning'
};
function createMessageInstance() {
  if (messageInstance && messageInstance.destroy) {
    messageInstance.destroy();
  }
 Notification.newInstance({
    prefixCls: 'dh-message',
    transitionName: 'move-up',
    style: { left:'50%' } // 覆盖原来的样式
  }, (n) => messageInstance = n);
  //兼容react 15版本
  if (!messageInstance) {
    messageInstance = Notification.newInstance({
      prefixCls: 'dh-message',
      transitionName: 'move-up',
      style: { left:'50%' } // 覆盖原来的样式
    });
  }
  return messageInstance;
}

function notice(args = {}) {
  const instance = multipleInstance && messageInstance ? messageInstance : createMessageInstance();
  instance.notice({
    content: (
      <div className="dh-message-container">
        <span className={`dh-message-icon dh-message-${args.type}`} >
          <Icon type={icons[args.type]} />
        </span>
        {
          typeof args.content === 'object' ? (
            <span className={`dh-message-title dh-message-${args.type}`} >
              {args.content.title || ''}
            </span>
          ) : null
        }

        <span className="dh-message-desc">
          {typeof args.content === 'object' ? args.content.desc : args.content }
        </span>
      </div>
    ),
    duration: args.duration || defaultDuration,
    onClose: args.onClose,
  });
  return (function () {
    let target = key;
    key += 1;
    return function() {
      instance.removeNotice(target);
    };
  }());
}

export default {
  info(content, duration, onClose) {
    return notice({ content, duration, onClose, type: 'info'});
  },
  success(content, duration, onClose) {
    return notice({ content, duration, onClose, type: 'success' });
  },
  error(content, duration, onClose) {
    return notice({ content, duration, onClose, type: 'error'});
  },
  warning(content, duration, onClose) {
    return notice({ content, duration, onClose, type: 'warning' });
  },
  clear() {
    createMessageInstance();
  }
}
