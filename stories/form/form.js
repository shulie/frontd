import React from 'react';
import { Input, Form,  Button, Select, Row, Col } from '../../src';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
  }
  handleClickClear() {
    this.props.form.resetFields();
  }
  handleClick() {
   this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      console.log('wjb', err);
    });
  }
  render() {
    const { getFieldError,  getFieldDecorator} = this.props.form;
    return (
      <div>
        <div className="test-form">
          <p>水平布局</p>
          <Form>
            <Form.Item
              colon
              label="固定样式"
            >
            我是个固定的数据
            </Form.Item>
            <Form.Item
              colon
              label="用户名"
            >
            {
              getFieldDecorator('email', {
                validateTrigger: 'onBlur',
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
              }]
              })(<Input />)
            }
            </Form.Item>
            <Form.Item
              label="性别"
            >
              {
                getFieldDecorator('sex')(
                  <Select placeholder="请选择">
                  <Select.Option value="1">男</Select.Option>
                  <Select.Option value="2">女</Select.Option>
                  <Select.Option value="3">4</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item
              label="个人爱好"
              extra="我是个人爱好"
            >
              {
                getFieldDecorator('name')(<Input type="text" />)
              }
            </Form.Item>
              <Form.Item
              label="个人爱好"
              extra="我是个人爱好"
            >
              {
                getFieldDecorator('a', {
                  initialValue: ''
                })(<input type="text" />)
              }
            </Form.Item>
            <Form.Item
            >
              <Button onClick={this.handleClick}> 提交 </Button>
              <Button onClick={this.handleClickClear}> 清空 </Button>
            </Form.Item>
          </Form>

        </div>
        <div className="test-form">
          <p>垂直布局</p>
          <Form layout="vertical">
            <Form.Item
              key="a"
              label="用户名"
              hasFeedback
            >
            <Input type="text" />
            </Form.Item>
            <Form.Item
              key="b"
              label="出生日期"
              hasFeedback
            >
              <Input type="text" />
            </Form.Item>
          </Form>

        </div>
         <div className="test-form" style={{ width: 600 }}>
          <p>行内布局</p>
          <Form layout="inline">
            <Form.Item
              key="b"
              label="出生日期"
              hasFeedback
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item label="你喜欢的运动">
              <Select  placeholder="请选择" style={{width: '100px'}}>
                  <Select.Option value="4">篮球</Select.Option>
                  <Select.Option value="5">羽毛球</Select.Option>
                  <Select.Option value="4">乒乓球</Select.Option>
              </Select>
            </Form.Item>
          </Form>

        </div>
        <div>
          <h2>栅格布局</h2>
          <Row>
            <Col span={4} offset={2}>
              <Input type="text"></Input>
            </Col>
            <Col span={4} offset={2}>
              <Input.Number type="text"></Input.Number>
            </Col>
            <Col span={4} offset={2}>
              <Select defaultValue={1}>
                <Select.Option value={1}>选项一</Select.Option>
                <Select.Option value={2}>选项二</Select.Option>
                <Select.Option value={3}>选项三</Select.Option>
                <Select.Option value={4}>选项四</Select.Option>
              </Select>
            </Col>
            <Col span={4} offset={2}>
              <Input type="password"></Input>
            </Col>
          </Row>
        </div>
        <div>
          <h2>行内form</h2>
          <Form>
            <Row>
              <Col span={6}>
                <Form.Item
                  label="用户名"
                  {...formItemLayout}
                 >
                  <Input type="text"></Input>
                </Form.Item>
              </Col>
              <Col span={4} offset={2}>
                <Form.Item
                  lebel="用户类型"
                >
                  <Select defaultValue={1}>
                    <Select.Option value={1}>管理员</Select.Option>
                    <Select.Option value={2}>教师</Select.Option>
                    <Select.Option value={3}>学生</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

    )
  }
}
export default Form.create()(FormDemo);
