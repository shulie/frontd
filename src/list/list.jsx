import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ListItem from './item';
class List extends React.Component {
  static Item = ListItem;
  static propsTypes = {
    defaultKeys: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]), // 默认选中的项
    selectedKeys: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]), //选中的项
    mode: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['only', 'multiple']), // LIST模式
    ]),
    animation: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    itemClassName: PropTypes.string, // 子元素的classNames
    itemStyles: PropTypes.object, // 子元素的styles
  }
  static childContextTypes = {
    itemClassName: PropTypes.string, // 子元素的classNames
    itemStyles: PropTypes.object, // 子元素的styles
    animation: PropTypes.bool,
    forbid: PropTypes.bool, // 禁用子元素的点击
  }
  static defaultProps = {
    mode: false,
    multiple: false,
    immutable: false,
    animation: true,
    icon: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    let selectedKeys = [];
    if (this.props.defaultKeys) {
      const defaultKeys = this.props.defaultKeys;
      if (typeof defaultKeys === 'string') {
        selectedKeys = [defaultKeys];
        console.error('Error:', 'defaultKeys is defined as Array, you pass in a string!!!');
      }  else if (Array.isArray(defaultKeys)) {
        selectedKeys = defaultKeys;
      }
    } else if (this.props.selectedKeys ) {
      if (Array.isArray(this.props.selectedKeys)) {
        selectedKeys = this.props.selectedKeys
      } else {
        throw new Error('selectedKeys is data type error');
      }
    }
     this.setState({ selectedKeys });
  }
  componentWillReceiveProps(nextProps) {
    let selectedKeys = [];
    if (JSON.stringify(nextProps.defaultKeys) !== JSON.stringify(this.props.defaultKeys)) {
      if (nextProps.defaultKeys) {
        const defaultKeys = this.props.defaultKeys;
        if (typeof defaultKeys === 'string') {
          selectedKeys = [defaultKeys];
          console.error('Error:', 'defaultKeys is defined as Array, you pass in a string!!!');
        }  else if (Array.isArray(defaultKeys)) {
          selectedKeys = defaultKeys;
        }
      }
    }
    if (JSON.stringify(nextProps.selectedKeys) !== JSON.stringify(this.props.defaultKeys)) {
      if (Array.isArray(nextProps.selectedKeys)) {
        selectedKeys = nextProps.selectedKeys;
      } else {
        throw new Error('selectedKeys is data type error');
      }
    }
    this.setState({ selectedKeys });
  }
  getChildContext() {
    const forbid = ['only', 'multiple'].indexOf(this.props.mode) !== -1 ? true : false;
    return {
      animation: this.props.animation,
      itemClassName: this.props.itemClassName, // 子元素的classNames
      itemStyles: this.props.itemStyles, // 子元素的styles
      forbid
    };
  }
  handleChange(key, selected) {
    const { multiple, mode, immutable } = this.props;
    const { selectedKeys } = this.state;
    let selectedRowKeys = [];
    if (typeof mode === 'string' && mode === 'only')  {
      selectedRowKeys = selected ? [key] : [];
      // // immutable -- only 模式下的可变性
      // if (typeof immutable === 'boolean' && immutable) {
      //   selectedRowKeys = [key];
      // } else {
      //   console.log('wjb-s', selected);

      // }
    } else if (typeof mode === 'string' && mode === 'multiple') {
      selectedRowKeys = selected ? Array.from(new Set([...selectedKeys, key]))
        : selectedKeys.filter(srk => srk !== key);
    }
    this.setState({ selectedKeys: selectedRowKeys}, () => {
      if (this.props.onChange) {
        this.props.onChange(selectedRowKeys);
      }
    });
  }
  render() {
    const { children, bordered, shadow, className, style } = this.props;
    const selectedKeys = this.props.selectedKeys ? this.props.selectedKeys : this.state.selectedKeys;
    return (
      <ul
        style={style}
        className={
          classNames('dh-list', {
            'dh-list-borderd': bordered,
            [className]: className
          })
        }
      >
        {
          React.Children.map(children,
           (child, idx) => {
              const props = {
                ...child.props,
                onChange: this.handleChange,
                eventKey: child.key,
                selectedKeys
              };
            return {...child, props};
          })
        }
      </ul>
    )
  }
}
export default List;
