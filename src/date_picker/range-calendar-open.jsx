import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar'
import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';
const prefixCls = 'dh-calendar'
class RangeCalenderOpen extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onFooterChange: PropTypes.func,
    format: PropTypes.string,
    defaultSelectedValue: PropTypes.array,
    selectedValue: PropTypes.array,
    ranges: PropTypes.object,
    defaultRange: PropTypes.string,
    cn: PropTypes.bool
  }
  static defaultProps = {
    format: 'YYYY-MM-DD',
    dateInputPlaceholder: ['开始日期', '结束日期'],
    cn: true,
    ranges: {}
  }
  constructor(props) {
    super(props)
    this.state = {
      rangeIdx:  Object.keys(props.ranges).findIndex(d => d === props.defaultRange),
      selectedValue: props.selectedValue || props.defaultSelectedValue
    }
  }
  componentWillReceiveProps(nextProps) {
    const { selectedValue } =  nextProps
    if (selectedValue !== this.props.selectedValue) {
      this.setState({selectedValue})
    } 
  }
  format = (v) => {
    return v ? v.format(this.props.format) : ''
  }
  handleOnChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }
  handleOnSelect = (value) => {
    this.setState({selectedValue:value }, () => {
      if (this.props.onSelect) {
        const datetring = [this.format(value[0]), this.format(value[1])]
        this.props.onSelect(value, datetring)
      }
    })
  }
  handleFooterClick = (value, rangeIdx) => {
    const { ranges } = this.props
    let dateString
    if(ranges) {
      dateString = Object.keys(ranges)[rangeIdx]
    }
    this.setState({selectedValue: value, rangeIdx}, () => {
      if(this.props.onFooterChange) {
        this.props.onFooterChange(value, dateString)
      }
    })
  }
  renderFooter = () => {
    const { ranges } = this.props
    if (!ranges) {
      return null
    }
    const operations = Object.keys(ranges).map((range, idx) => {
      const value  = ranges[range]
      return (
        <a
          className={classnames({[`${prefixCls}-range-quick-selector-actived`]: idx == this.state.rangeIdx})}
          key={range}
          onClick={() => this.handleFooterClick(value, idx)}
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
  render() {
    const { cn, dateInputPlaceholder, format, defaultSelectedValue } = this.props
    const { selectedValue } = this.state
    return ( 
      <RangeCalendar 
        className={`${prefixCls}-range-open`}
        prefixCls={prefixCls}
        showToday={false}
        dateInputPlaceholder={dateInputPlaceholder}
        locale={cn ? zhCN : enUS}
        showOk={false}
        showClear
        format={format}
        defaultSelectedValue={defaultSelectedValue}
        selectedValue={selectedValue}
        renderFooter={this.renderFooter}
        onChange={this.handleOnChange}
        onSelect={this.handleOnSelect}
      />
    )
  }
}
export default RangeCalenderOpen