import React from 'react'
import { Datasheet,  Input, Form } from '../../src'

let grid = function () {
  let option = [];
  for (let idx = 0; idx < 20; idx++) {
    let row = [];
    for(let jdx = 0; jdx < 15; jdx++) {
      let t =  jdx === 0 ? { value: idx + 1} : { value: `${Math.floor(Math.random()*100)}` }
      row.push(t)
    }
    option.push(row)
  }
  return option
}
let header = [
    { title: '序号11111111'},
    { title: '测试1111111111'},
    { title: '测试22222222222'},
    { title: '测试333333333'},
    { title: '测试444444444'},
    { title: '测试555555555'},
    { title: '测试666666666'},
    { title: '测试6777777777'},
    { title: '测试6888888888'},
    { title: '测试68888888888'},
    { title: '测试6'},
    { title: '测试6'},
    { title: '测试6'},
    { title: '测试6'},
    { title: '测试6'}
];
class DataSheetDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: grid()
        }
    }
    handleScrollPage = (record) => {
       console.log(record)
      // let tmp = [].concat(this.state.grid, grid()).map((c, i) => {
      //   return c.map((d, j) => ({ ...d, value: j === 0 ? i : d.value }))
      // })
      // this.setState({
      //   grid: tmp
      // })
    }
    render() {
      const { getFieldDecorator} = this.props.form
      return (
        <div>
          <div style={{ marginBottom: 60 }}>{
            getFieldDecorator('field')(
                <Input />
            )
          }
          </div>
          <Datasheet
            dataSource={this.state.grid}
            header={header}
            onChange={(pre, next, index) => {
              console.log('pre', pre)
              console.log('next', next)
              console.log('index', index)
            }}
            onScrollPage={this.handleScrollPage}
          />
        </div>
        )
    }
}
export default  Form.create()(DataSheetDemo)
