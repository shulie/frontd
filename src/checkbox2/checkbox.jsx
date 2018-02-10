import React, { Component } from 'react'

import RcCheckbox from 'rc-checkbox'

class Checkbox extends Component {
  static defaultProps = { 
    prefixCls: 'dh-checkbox2'
  }
  constructor(props) {
    super(props)
    this.state = {
      checked: props.defaultChecked || false
    }
  }
  componentWillReceiveProps(nextPrps) {
    if (nextPrps.checked !== this.props.checked) {
      this.setState({checked: nextPrps.checked })
    }
  }
  handleClick = () => {
    this.setState({checked: !this.state.checked}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.props.checked)
      }
    })
  }
  handleChange = (e, checked) => {
    if (this.props.onChange) {
      this.props.onChange(checked)
    }
  }
  render() {
    const { children, prefixCls, ...restPrps } = this.props
    return (
      <lable className={`${prefixCls}-wrapper`}
        onClick={this.handleClick}
      >
        <RcCheckbox
          checked={this.state.checked}
          prefixCls={prefixCls}
          onChange={this.handleChange}
          { ...restPrps }
        />
        { children !== undefined ? <span>{children}</span> : null }
      </lable>
    )
  }
}

export default Checkbox