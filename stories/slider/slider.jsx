import React from 'react';
import { Slider, Dropdown, Icon, Menu, DatePicker } from '../../src';
import moment from 'moment';

function TitleDate(props) {
  return (
    <div style={{with: '100px', height: '50px'}}>
      <p>tooltip标题</p>
      <DatePicker value={moment(props.date)} onChange={props.onChange} />
    </div>
  )
}

const label = (
  <div>
    <p>起始日期</p>
    <span>2017.08.17</span>
  </div>
);
const marks1 = {
  10: {
    label: label
  },
  20: '20%',
  60: '60%',
};
const marks2 = {
  0: '0%',
  10: '10%',
  20: '20%',
  60: '60%',
  80: {
    style: {
      color: 'red'
    },
    label: <div>
      <p>起始日期</p>
      <span>2017.08.17</span>
    </div>
  }
};

class SliderDemo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      values: [1473280026471,1477765768800]
    }
  }
  renderElement = () => {
    const { values } = this.state;
    const TitleDate1 = <TitleDate date={values[0]} onChange={this.handleDateChangeLeft} />;
    const TitleDate2 = <TitleDate date={values[1]} onChange={this.handleDateChangeRight}/>;
    return [
    TitleDate1,
    TitleDate2
    ];
  }
  handleChange = (values) => {
    this.setState({values})
  }
  handleDateChangeLeft = (date,dateString) => {
    let { values } = this.state;
    values[0]  = Date.parse(new Date(dateString));
    this.setState({values})
  }
  handleDateChangeRight = (date,dateString) => {
    let { values } = this.state;
    values[1]  = Date.parse(new Date(dateString));
    this.setState({values})
  }
  render() {
    return (
      <div style={{padding: '16px'}}>
        <Slider
          visible
          auto
          min={1470153600000}
          max={1495527496000}
          allowCross={false}
          value={this.state.values}
          trigger={['hover']}
          overlay={this.renderElement()}
          range={2}
          defaultValue={[20, 1495527496000]}
          onChange={this.handleChange}
         />
        <br/>
        <br/>
        <Slider auto visible  placement="right" step={null} min={10}  marks={marks1}  defaultValue={30} />
        <br/>
        <br/>
        <Slider  step={null} max={80} reverse  marks={marks2}  defaultValue={10} />
        <br/>
        <div>
         <Slider 
           auto 
           range 
           visible
           overlayClassName={'tooltipClassName'} 
           trigger={['hover']} 
           defaultValue={[20, 50]} />
        </div>
      </div>
    )
  }
}

export default SliderDemo;
