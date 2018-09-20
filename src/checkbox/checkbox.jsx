import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckboxGroup from './group';

class Checkbox extends Component {
  static Group = CheckboxGroup
  static propTypes = {
    defaultValue: PropTypes.bool,
    onChange: PropTypes.func
  }
  static defaultProps = {
    defaultValue: false,
    onChange: function(){}
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultValue 
    };
    this.onClickSelect = this.onClickSelect.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({checked: nextProps.checked})
    }
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
      <div
        className={`dh-checkbox ${checked ? 'dh-checkbox-checked' : ''}`}
        onClick={this.onClickSelect}
        style={this.props.style}
      >
        <i className={`dh-icon ${checked ? 'dh-icon-checkbox-checked' : 'dh-icon-checkbox'}`} />
        <span>{this.props.children}</span>
      </div>
    )
  }
}

export default Checkbox;
