import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RcPicker from 'rc-calendar/bin/picker'
import classnames from 'classnamses'

class Picker extends Component {
  static defaultProps = {
    prefixCls: 'dh-calender'
  }
  static propTypes = {
    defaultValue: PropTypes.object,
    defaultCalendarValue: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
      showTime: true,
      showDateInput: true,
      disabled: false,
      value: this.props.defaultValue
    }
  }
 
  render() {
    const { disabled, value } = this.state
    return (
      <RcPicker
        animation="slide-up"
        disabled={disabled}
        calendar={this.props.children}
        value={value}
        onChange={this.onChange}
      >
       {
         ({ value }) => {
           return (
             <div className="dh-calender-picker">
              <input
                  placeholder="please select"
                  style={{ width: 250 }}
                  disabled={disabled}
                  readOnly
                  className="dh-calendar-picker-input dh-input"
                  value={value}
                />
             </div>
           )
         }
       }
      </RcPicker>
    )
  }
}
export default Picker