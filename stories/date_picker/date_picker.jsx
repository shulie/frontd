import React, { Component } from 'react'
import { DatePicker, Button } from '../../src'
import './style.scss'
import moment from 'moment'

const RangeCalendar = DatePicker.RangeCalendar
const RangeCalendarOpen = DatePicker.RangeCalendarOpen
const ranges = {
  '今日': [moment().local().startOf('day'), moment().local()],
  '昨日': [moment().local().subtract(1, 'days'), moment().local()],
  '近7日': [moment().local().subtract(7, 'days'), moment().local()],
  '近14日': [moment().local().subtract(14, 'days'), moment().local()],
  '本月': [moment().local().startOf('month'), moment().local().endOf('month')],
  '上月': [moment().local().subtract(1, 'month').startOf('month'), moment().local().subtract(1, 'month').endOf('month')]
}
class DatePickerDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      range: '今天'
    }
  }
  handleClear = () => {
    console.log('handleClear')
  }
  handleClick = () => {
    let random = Math.round(Math.random())
    console.log(random,'random')
    this.setState({range: random === 0 ? '今天' :'本月'})
  }
  handleRangeChange = (data, datatring, rangeIdx) => {
    console.log(data, 'data')
    console.log(datatring, 'datatring')
    console.log(rangeIdx, 'rangeIdx')
  }
  handleOpenChange = (value) => {
    console.log(value, 'open-change')
  }
  handleOpenSelect = (date, datetring) => {
    console.log(date, 'open-select-date')
    console.log(datetring, 'open-select-datetring')
  }
  render() {
    return (
      <div>
        <div className="demo-date-picker">
          <DatePicker
            style={{width: '300px'}}
            showTime={false}
            format= 'YYYY-MM-DD'
            onChange={(value) => { console.log(value) }}
          />
        </div><br/>
        <div className="demo-date-picker">
          <DatePicker
            style={{width: '300px'}}
            format= 'YYYY-MM-DD HH:mm:ss'
            showTime
          />
        </div><br/>
        <div className="demo-date-picker">
        <RangeCalendar
          format= 'YYYY-MM-DD'
          onChange={this.handleRangeChange}
          // defaultRange={'今日'}
          // defaultValue={[moment(), moment()]}
          range={'本月'}
          value={[moment(), moment()]}
          ranges={ranges}
          showClear
          showDateInput
          onClear={this.handleClear}
        />
      </div><br/>
      <div className="demo-date-picker">
      <RangeCalendar
          showTime
          format= 'YYYY-MM-DD HH:mm:ss'
          ranges={{ '今天': [moment(), moment()], '本月': [moment(), moment().endOf('month')] }}
          range={this.state.range}
          className="nnnnn"
          wrapperClassName="uuuuuuuuu"
          onChange={(value, str) => {
            console.log(value, '8888888', str)
          }}
          onOk={(value) => {
            console.log(value, 'ok')
          }}
        />
      </div><br/>
      <Button onClick={this.handleClick}>改变range</Button>
      <br/>
       <div style={{width: '100%',padding: '8px'}}>
         <RangeCalendarOpen 
          ranges={ranges}
          defaultRange='本月'
          defaultSelectedValue={[moment(), moment().endOf('month')]}
          onChange={this.handleOpenChange}
          onSelect={this.handleOpenSelect}
          />
       </div>      
      </div>
    )
  }
}

export default DatePickerDemo
