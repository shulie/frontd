import React from 'react';
import PropTypes from 'prop-types';
import RcDialog from 'rc-dialog';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import is from 'is_js';
import Button from '../button';
let mousePosition;
let mousePositionEventBinded;

class Modal extends React.Component {
  static defaultProps = {
    width: 380,
    transitionName: 'zoom',
    maskTransitionName: 'fade',
    confirmLoading: false,
    visible: false,
    okText: '确定',
    cancelText:'取消',
  };
  static propType = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    confirmLoading: PropTypes.bool,
    footer: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.bool
    ]),
    title: PropTypes.node, //sting: 主标题；
    desc: PropTypes.string // 描述信息
  };
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  componentDidMount() {
    this.setMousePosition();
  }
  setMousePosition() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    addEventListener(document.documentElement, 'click', (e) => {
      mousePosition = {
        x: e.pageX,
        y: e.pageY,
      };
      // 100ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => mousePosition = null, 100);
    });
    mousePositionEventBinded = true;
  }
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  handleOk() {
    if (this.props.onOk) {
      this.props.onOk();
    }
  }
  renderFooter() {
    const { cancelText, okText, footer } = this.props;
    if (is.object(footer)) return footer; //element类型 直接返回
    const buttonOk = okText ? (
      <button
        key="ok"
        onClick={this.handleOk}
        className="dh-modal-footer_btn"
      >
        {okText}
      </button>
    ) : null
    const buttonCancel = cancelText ? (
      <button
        key="cancel"
        onClick={this.handleCancel}
        className="dh-modal-footer_btn"
      >
        {cancelText}
      </button>
    ) : null;
    return [buttonOk, buttonCancel];
  }
  renderTitle() {
    const { title, desc, footer } = this.props;
    const titleElement = title ? (
       <div key="title" className="dh-modal-title__label">
          { title }
        </div>
    ) : null;
   const descElement = desc ? (
      <div key="desc" className="dh-modal-title__desc">
          { desc }
      </div>
    ) : null;
    return [titleElement, descElement];
  }
  render() {
    const {footer, confirmLoading, ...props } = this.props;
    return (
      <RcDialog
        prefixCls="dh-modal"
        onClose={this.handleCancel}
        {...props}
        footer={ is.boolean(footer) && !footer ? null : this.renderFooter()}
        mousePosition={mousePosition}
      />
    )
  }
}

export default Modal;
