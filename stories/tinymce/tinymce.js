import React, { Component } from 'react';
import { Tinymce } from '../../src';

export default class Tinymce2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rawContent: ''
    }
  }
  handleClick = () => {
    this.setState({
      rawContent: '这是插入的一段话'
    })
  }
  render() {
    const { rawContent } = this.state
    return (
      <div style={{ width: 600, height: 300, background: '#3e3e3e', padding: 10}}>
        <Tinymce
          uploadConfig={{
          name: 'bin',
          action: "https://dev.datahunter.cn/api/upload",
          formatResult: (res) => {
            return {
                url: `https://dev.datahunter.cn/${res.msg.url}`
            }
          }

        }}
          rawContent={rawContent}
          onSave={(r) => {console.log('test-export', r)}}
        footer
      />
      <span 
        onClick={this.handleClick}
        style={{
          border: '1px solid #000',
          background: 'ccc',
          display: 'block',
          marginTop: 10
        }}
      >点击</span>
    </div>
    )
  }
}