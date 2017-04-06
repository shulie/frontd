import React, { PropTypes } from 'react';
import RcDialog from 'rc-dialog';
import Button from '../button';

class Modal extends React.Component {
  static defaultProps = {
    prefixCls:'dh-modal',
    width: 520,
    transitionName: 'zoom',
    maskTransitionName: 'fade',
    confirmLoading: false,
    visible: false,
  };
  static propType = {
    prefixCls: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.node,
    cancelText: PropTypes.node,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    confirmLoading: PropTypes.bool,
    visible: PropTypes.bool,
    align: PropTypes.object,
    footer: PropTypes.node,
    title: PropTypes.node,
    closable: PropTypes.bool,
  };
  constructor(props) {
    super(props);
  }
  handleCancel = (e) => {
    const onCancel = this.props.onCancel;
    if (onCancel) {
      onCancel(e);
    }
  }
  render() {
    const { visible, prefixCls, cancelText, okText, footer, mousePosition } = this.props;
    const defaultFooter = [
    <Button
      key="cancel"
      onClick={this.handleCancel}
    >
      {cancelText || '取消'}
    </Button>,
    <Button
      key="confirm"
      type="primary"
      // loading={confirmLoading}
      // onClick={this.handleOk}
    >
      {okText || '确定'}
    </Button>,
  ];

    return (
      <RcDialog
        onClose={this.handleCancel}
        footer={footer || defaultFooter}
        visible={visible}
        mousePosition={mousePosition}
        {...this.props}
      />
    )
  }
}

export default Modal;
