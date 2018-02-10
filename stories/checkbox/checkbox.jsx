import React, { Component } from 'react'
import { Checkbox2, Checkbox } from '../../src'

class CheckboxDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }
  handleChange = (checked) => {
    console.log(checked,'checked')
    this.setState({checked})
  }
  render() {
    return (
      <div style={{margin: '10px'}}>
       <Checkbox2 name="dddd" onChange={(checked) => { console.log('checked', checked) }}>Checkbox2</Checkbox2>
       <br/>
       <Checkbox checked={this.state.checked} onChange={this.handleChange} > Checkbox</Checkbox>
      </div>
    )
  }
}
export default CheckboxDemo
