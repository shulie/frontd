import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import DatePicker from 'rc-calendar/lib/Picker'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar'
import TimePickerPanel from 'rc-time-picker/lib/Panel'
// import { Icon } from '../index'
import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import 'rc-calendar/assets/index.css'

const prefixCls = 'dh-calendar'
class RangeDateCalendar extends Component {
  static defaultProps = {
    prefixCls: 'dh-calendar',
    placeholder: '请选择日期',
    locale: zhCN,
    showToday: false,
    dateInputPlaceholder: ['开始', '结束'],
    rangePlaceholder: ['开始日期', '结束日期'],
    showClear: false,
    showDateInput: true,
    ranges: {}
  }
  static propTypes = {
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    style: PropTypes.object,
    showTime: PropTypes.bool,
    showToday: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    dateInputPlaceholder: PropTypes.array,
    rangePlaceholder: PropTypes.array,
    showDateInput: PropTypes.bool,
    ranges: PropTypes.object,
    range: PropTypes.string,
    defaultRange: PropTypes.string,
    wrapperClassName: PropTypes.string,
    className: PropTypes.string
  }
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || props.defaultValue,
      rangeIdx: this.setRangeIdx(props.ranges, props.range || props.defaultRange),
      open: false
    }
  }
  componentWillReceiveProps(nextProps) {
     if (nextProps.value !== this.props.value ||
        nextProps.range !== this.props.range) {
          this.setState({
            value: nextProps.value,
            rangeIdx: this.setRangeIdx(nextProps.ranges, nextProps.range)
          })
    }
  }
  setRangeIdx = (ranges, range) => {
    return Object.keys(ranges).findIndex(d => d === range)
  }
  // getShowDateFromValue = () => {
  //   // const [start, end] = value;
  //   const start = moment()

  //   // value could be an empty array, then we should not reset showDate
  //   if (!start && !end) {
  //     return;
  //   }
  //   const newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
  //   return [start, newEnd];
  // }
  format = (v) => {
    return v ? v.format(this.props.format) : '';
  }

  isValidRange = (v) => {
    return v && v[0] && v[1];
  }
  getDatestring = (value) => {
    if (Array.isArray(value) && value.length > 1)
    return [ this.format(value[0]), this.format(value[1]) ]
  }
  onChange = (value) => {
    this.setState({ value });
  }
  handleChange = (value, rangeIdx) => {
    if (this.props.onChange && Array.isArray(value) && value.length > 1) {
      const rangeStr = Object.keys(this.props.ranges).find((d, i) => i === rangeIdx) || null
      const datestring = this.getDatestring(value)
      this.props.onChange(value, datestring, rangeStr)
      this.setState({rangeIdx: -1})
    }
  }
  // handleValueChange = (value) => {
  //   // this.setState({selectedValue: value})
  // }
  handleOk = (value) => {
    if (this.props.onOk) {
      this.props.onOk(value)
    }
  }
  handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({value: []})
    if (this.props.onClear) {
      this.props.onClear()
    }
  }
  handleOpenChange = (open) => {
    this.setState({open})
  }
  setValue = (value, idx) => {
    this.handleChange(value, idx);
    this.setState({ value, rangeIdx: idx, open: !this.state.open });
  }
  clearHoverValue = () => this.setState({ hoverValue: [] });
  renderFooter = () => {
    const { ranges } = this.props
    if (!ranges) {
      return null
    }
    const operations = Object.keys(ranges || {}).map((range, idx) => {
      const value  = ranges[range]
      return (
        <a
          className={classnames({[`${prefixCls}-range-quick-selector-actived`]: idx == this.state.rangeIdx})}
          key={range}
          onClick={() => this.setValue(value, idx)}
          // onMouseEnter={() => this.setState({ hoverValue: value })}
          // onMouseLeave={this.clearHoverValue}
        >
          {range}
        </a>
      )
    })
    const rangeNode = (
      <div className={`${prefixCls}-footer-extra ${prefixCls}-range-quick-selector`} key="range">
        {operations}
      </div>
    )
    return [ rangeNode ]
  }
  renderCalendar = () => {
    const { prefixCls, locale, showTime, showToday, ranges, dateInputPlaceholder, showDateInput, wrapperClassName,
       ...restProps } = this.props
    const timePickerElement =  <TimePickerPanel  prefixCls="dh-calendar-time-picker" defaultValue={moment('00:00:00', 'HH:mm:ss')} />;
    return (
      <RangeCalendar
        prefixCls={prefixCls}
        className={classnames({
          'dh-calendar-time': showTime,
          [`${prefixCls}-range-with-ranges`]: ranges,
          'dh-calendar-input-wrap-disabled': !showDateInput,
          [`${wrapperClassName}`]: wrapperClassName
        })}
        showToday={showToday}
        locale={locale}
        style={{ zIndex: 1000 }}
        dateInputPlaceholder={dateInputPlaceholder}
        timePicker={showTime ? timePickerElement : null}
        renderFooter={this.renderFooter}
        // onValueChange={this.handleValueChange}
        onChange={this.handleChange}
        onOk={this.handleOk}
      />
    )
  }
  render() {
    const { value, open } = this.state
    const { disabled, locale, rangePlaceholder, showClear, className } = this.props
    return (
      <DatePicker
        animation="slide-up"
        locale={locale}
        disabled={disabled}
        onChange={this.onChange}
        calendar={this.renderCalendar()}
        value={value}
        open={open}
        onOpenChange={this.handleOpenChange}
      >
        {
          ({value}) => {
            return (
              <div className={classnames('dh-calendar-picker', {
                [`${className}`]: className
              })}>
                <span className="dh-calendar-picker-input">
                  <input
                    placeholder={rangePlaceholder[0]}
                    style={{...this.props.style}}
                    disabled={disabled}
                    readOnly
                    className="dh-calendar-range-picker-input"
                    value={this.isValidRange(value) && `${this.format(value[0])}` || ''}
                  />
                  <span className="dh-calendar-range-picker-separator" >~</span>
                  <input
                    placeholder={rangePlaceholder[1]}
                    style={{...this.props.style}}
                    disabled={disabled}
                    readOnly
                    className="dh-calendar-range-picker-input"
                    value={this.isValidRange(value) && `${this.format(value[1])}` || ''}
                  />
                  { showClear && this.isValidRange(value) &&<span onClick={this.handleClear} className="dh-calendar-picker-clear" /> }
                  <span className="dh-calendar-picker-icon"></span>
                </span>
              </div>
            )
          }
        }
      </DatePicker>
    )
  }
}
export default RangeDateCalendar
