import React from 'react';
import { Test, Menu, Row, Col, Button, Icon, Dropdown, message, Tooltip, Modal } from '../../src';

class Wrapper extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			title:'请选择看板分组',
		};
	}
 handleDropdown(key,value) {
	 console.log('key',key);
	 console.log('value',value)
 }
 handleMessage() {
	 console.log(message);
	 message.success('message success');
 }
 handleSelect(key) {
	const title = key.item.props.children;
	 this.setState({title});
 }
 showModal() {
	 this.setState({visible:true});
 }
 handleCancel = () => {
	 this.setState({visible:false});
 }
 handleOk = () => {
	 console.log('确定了');
	 this.handleCancel();
 }
	render() {
		let options = [{key:'1',value:'选项一'},{key:'2',value:'选项二'},{key:'3',value:'选项三'},{key:'4',value:'选项四'},];
		let overlay = <div>提示文字</div>
		const itemlist = (
			<Menu onSelect={this.handleSelect.bind(this)}>
				<Menu.Item key="1">选项一</Menu.Item>
				<Menu.Item key="2">选项二</Menu.Item>
				<Menu.Item key="3">选项三</Menu.Item>
				<Menu.Item key="4">选项四</Menu.Item>
			</Menu>
		)
		const { title } = this.state;
		const titleEl = {title:'主标题',subhead:'副标题'};
		return (
	    <div>
			 	<Test/>
				<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['2']}
						style={{ lineHeight: '64px' }}
					>
        	<Menu.Item key="1">nav 1</Menu.Item>
        	<Menu.Item key="2">nav 2</Menu.Item>
        	<Menu.Item key="3">nav 3</Menu.Item>
      	</Menu>
				<div className="dh-test-grad">
					<Row type="flex" justify="space-around">
						<Col span={4}>col-4</Col>
						<Col span={4}>col-4</Col>
						<Col span={4}>col-4</Col>
						<Col span={4}>col-4</Col>
					</Row>
				</div>

				<div style={{marginTop: 24, padding: 24}}>
						<Button>我是默认按钮</Button>
						<Button type="primary">我是按钮primary</Button>
						<Button type="danger">我是按钮danger</Button>
						<Button type="danger" disabled>我被禁用了</Button>
						<Button type="primary" size="small">我是小按钮</Button>
						<div style={{ color: 'red', fontSize: 24}}>
							<Icon type="plus"/>
						</div>
				</div>
				{/* <div style={{marginTop:20,marginLeft:50,width:300}}>
					 <Dropdown
						  options={options}
							onClick={this.handleDropdown}
						 />
				</div> */}
				<h1 style={{textAlign:'center'}} >测试组件</h1>
				<div style={{width:800,height:500,margin:'0 auto',border:'1px solid #eee'}}>

					<Button onClick={this.handleMessage}>success</Button>
					<Button onClick={()=>{message.error('error','已通知',2,() =>{
						console.log('callback')
					})}}>error+callback</Button>
					<Button onClick={()=>{message.warning('warning')}}>waring</Button>
					<Button onClick={()=>{message.clear()}}>clear</Button>
					<div className="demo">
        		<div className="container">
          <div className="top">
            <Tooltip title="提示语句" name="张三" placement="topLeft" trigger={['hover']}>
              <a href="">上左</a>
            </Tooltip>
            <Tooltip title="提示语句" placement="top" trigger={['hover']}>
							<a href="">上边</a>
            </Tooltip>
            <Tooltip title="提示语句" placement="topRight" trigger={['hover']}>
              <a>上右</a>
            </Tooltip>
          </div>
          <div className="bottom">
            <Tooltip title="提示语句" placement="bottomLeft" trigger={['hover']}>
              <a>下左</a>
            </Tooltip>
            <Tooltip title="提示语句" placement="bottom" trigger={['hover']}>
							<a>下边</a>
            </Tooltip>
            <Tooltip title="提示语句" placement="bottomRight" trigger={['hover']}>
              <a href="">下右</a>
            </Tooltip>
          </div>
          <div className="left">
            <Tooltip title="提示语句" placement="leftTop" trigger={['hover']}>
              <a href="">左上</a>
            </Tooltip>
            <Tooltip title="提示语句" placement="left" trigger={['hover']}>
            <a href="">左边</a>
            </Tooltip>
            <Tooltip title="提示语句" placement="leftBottom" trigger={['hover']}>
              <a href="">左右</a>
            </Tooltip>
          </div>
          <div className="right">
            <Tooltip title="提示语句" placement="rightTop" trigger={['hover']}>
              <a href="">右上</a>
            </Tooltip>
            <Tooltip title="提示语句" placement="right" trigger={['hover']}>
              <a href="">右边</a>
            </Tooltip>
            <Tooltip title="提示语句" placement="rightBottom" trigger={['hover']}>
              <a href="">右下</a>
            </Tooltip>
          </div>
         </div>
				 <div>
					 <div style={{marginTop:30,width:100,float:'left'}}>
						 <Dropdown
							 overlay={itemlist}
							>
	              <a href="">dropdown</a>
						 </Dropdown>
					 </div>
					 <div style={{marginTop:30,width:200,float:'left'}}>
						 <Dropdown title={title}  overlay={itemlist} />
					 </div>
					 <div style={{marginTop:30,width:200,float:'left'}}>
           		<Button onClick={this.showModal.bind(this)}>点我打开对话框</Button>
					 </div>
					 <Modal
						//  title={ titleEl }
						 title="对话框标题"
						 visible={this.state.visible}
						 onCancel={this.handleCancel}
						 onOk={this.handleOk}
						>
							<p>对话框内容</p>
							<p>对话框内容</p>
							<p>对话框内容</p>
							<p>对话框内容</p>
						</Modal>
				 </div>
      </div>
				</div>
			</div>
		);
	}
}

export default Wrapper;
