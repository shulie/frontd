import React, { Component, PropTypes } from 'react';

import Group from './group';

class Checkbox extends Component {
  static Group = Group;

  static propTypes = {
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.function
  }

  static defaultProps = {
    defaultChecked: false,
    onChange: function(){}
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: props.defaultChecked
    };
    this.onClickSelect = this.onClickSelect.bind(this);
  }

  onClickSelect() {
    const { checked } = this.state;

    if (typeof(this.props.checked) !== 'undefined') {
      return this.props.onChange(!this.props.checked);
    }

    this.setState({
      checked: !checked
    });

    this.props.onChange(!checked);
  }

  render() {
    let { checked } = this.state;
    if (typeof(this.props.checked) !== 'undefined') {
      checked = this.props.checked;
    }

    return (
      <div className={`dh-checkbox ${checked ? 'dh-checkbox-checked' : ''}`} onClick={this.onClickSelect}>
        <i>ic</i>
        <span>{this.props.children}</span>
      </div>
    )
  }
}

export default Checkbox;