import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import DatePicker from 'rc-calendar/lib/Picker'
import RcCalendar from 'rc-calendar'
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import 'rc-calendar/assets/index.css'

class Calendar extends Component {
  static defaultProps = {
    prefixCls: 'dh-calendar',
    placeholder: '请选择日期',
    locale: zhCN,
    format: 'YYYY-MM-DD',
    showDateInput: false
  }
  static propTypes = {
    defaultValue: PropTypes.object,
    style: PropTypes.object,
    showTime: PropTypes.bool,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    showDateInput: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      value: this.props.defaultValue
    }
  }
  onChange = (value) => {
    this.setState({ value });
  }
  handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({value: null})
    if (this.props.onClear) {
      this.props.onClear()
    }
  }
  renderCalendar() {
    const { prefixCls, locale, showTime, showDateInput,  ...restProps } = this.props
    const timePickerElement =  <TimePickerPanel prefixCls="dh-calendar-time-picker" defaultValue={moment('00:00:00', 'HH:mm:ss')} />;
    return (
      <RcCalendar
        prefixCls={prefixCls}
        className={classnames({'dh-calendar-time': showTime})}
        locale={locale}
        showDateInput={showDateInput}
        style={{ zIndex: 1000 }}
        timePicker={showTime ? timePickerElement : null}
        {...restProps}
      />
    )
  }
  render() {
    const { value } = this.state
    const { format, disabled } = this.props
    return (
      <DatePicker
        animation="slide-up"
        disabled={disabled}
        calendar={this.renderCalendar()}
        onChange={this.onChange}
        value={value}
      >
        {
          ({value}) => {
            return (
            <span className="dh-calendar-picker"  style={{...this.props.style}}>
              <div> 
                <input
                  placeholder={this.props.placeholder}
                  disabled={disabled}
                  readOnly
                  className="dh-calendar-picker-input"
                  value={value && value.format(format) || ''}
                />
                { value &&  <span onClick={this.handleClear} className="dh-calendar-picker-clear" />}
                <span className="dh-calendar-picker-icon"></span>
              </div>
              </span>
            )
          }
        }
      </DatePicker>
    )
  }
}
export default Calendar
