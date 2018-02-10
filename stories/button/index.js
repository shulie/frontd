import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import withReadme from 'storybook-readme/with-readme';
import buttonReadme from './button.md';
import { Button, Modal } from '../../src';
const options = {
  inline: true, propTables: false
}

storiesOf('按钮组件-文佩', module)
  .addDecorator(withReadme(buttonReadme))
  .addWithInfo(
    '按钮样式',
    () => (
      <div className="test-btn">
        <div className="test-btn-item">
          <span>默认按钮</span>
          <Button>按钮1</Button>
          <Button icon="setting">我是带图标</Button>
          <Button icon="setting" shape="circle"/>
          <Button icon="search" shape="circle" size="small"/>
          <Button size="small">我是小按钮</Button>
          <Button icon="setting" size="small">我是小按钮</Button>
          <Button type="success" disabled>我被禁用</Button>
        </div>
        <div className="test-btn-item">
          <span>success</span>
          <Button type="success">按钮1</Button>
          <Button type="success" icon="setting" onClick={action('点击了我')}>我是带图标</Button>
          <Button type="success" icon="setting" shape="circle"/>
          <Button type="success" icon="search" shape="circle" size="small"/>
          <Button type="success" size="small">我是小按钮</Button>
          <Button type="success" icon="setting" size="small">我是小按钮</Button>
          <Button type="success" type="success" disabled>我被禁用</Button>
          <Button type="success" type="success" ghost>我被幽灵</Button>
        </div>
        <div className="test-btn-item">
          <span>info</span>
          <Button type="info">按钮1</Button>
          <Button type="info" icon="setting">我是带图标</Button>
          <Button type="info" icon="setting" shape="circle"/>
          <Button type="info" icon="search" shape="circle" size="small"/>
          <Button type="info" size="small">我是小按钮</Button>
          <Button type="info" icon="setting" size="small">我是小按钮</Button>
          <Button type="info" type="info" disabled>我被禁用</Button>
          <Button type="info" type="info" ghost>我被幽灵</Button>
        </div>
        <div className="test-btn-item">
          <span>warning</span>
          <Button type="warning">按钮1</Button>
          <Button type="warning" icon="setting">我是带图标</Button>
          <Button type="warning" icon="setting" shape="circle"/>
          <Button type="warning" icon="search" shape="circle" size="small"/>
          <Button type="warning" size="small">我是小按钮</Button>
          <Button type="warning" icon="setting" size="small">我是小按钮</Button>
          <Button type="warning" type="warning" disabled>我被禁用</Button>
          <Button type="warning" type="warning" ghost>我被幽灵</Button>
        </div>
        <div className="test-btn-item">
          <span>danger</span>
          <Button type="danger">按钮1</Button>
          <Button type="danger" icon="setting">我是带图标</Button>
          <Button type="danger" icon="setting" shape="circle"/>
          <Button type="danger" icon="search" shape="circle" size="small"/>
          <Button type="danger" size="small">我是小按钮</Button>
          <Button type="danger" icon="setting" size="small">我是小按钮</Button>
          <Button type="danger" type="danger" disabled>我被禁用</Button>
          <Button type="danger" type="danger" ghost>我被幽灵</Button>
        </div>
      </div>
  ), options)
