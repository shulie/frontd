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
    footer: PropTypes.node,
    title: PropTypes.node,//sting: 主标题； object: {title:'主标题',subhead:'副标题'}
    closable: PropTypes.bool,
    keyboard: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.renderDefaultFooter = this.renderDefaultFooter.bind(this);
    this.renderSubheadTitle = this.renderSubheadTitle.bind(this);
  }
  handleCancel = (e) => {
    const onCancel = this.props.onCancel;
    if (onCancel) {
      onCancel(e);
    }
  }
  handleOk = (e) => {
    const onOk = this.props.onOk;
    if (onOk) {
      onOk(e);
    }
  }
  renderDefaultFooter() {
    const { prefixCls,  cancelText, okText, footer, confirmLoading } = this.props;
      return [
        <Button
          key="cancel"
          onClick={this.handleCancel}
        >
          {cancelText || '取消'}
        </Button>,
        <Button
          key="confirm"
          type="primary"
          loading={confirmLoading}
          onClick={this.handleOk}
        >
          {okText || '确定'}
        </Button>,
     ];
  }
  renderSubheadTitle() {
    const {  prefixCls, title } = this.props;
    if (title instanceof Object) {
      return [
        <div key="title" className={`${prefixCls}-title-main`}>
          { title.title }
        </div>,
        <div key="sub" className={`${prefixCls}-title-sub`}>
          { title.subhead }
        </div>,
      ]
    }
    return title;
  }
  render() {
    const { prefixCls, visible, title, footer, confirmLoading } = this.props;
    return (
      <RcDialog
        onClose={this.handleCancel}
        {...this.props}
        footer={footer || this.renderDefaultFooter()}
        visible={visible}
        title={ this.renderSubheadTitle() }
      />
    )
  }
}

export default Modal;
