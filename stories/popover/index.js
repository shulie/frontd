import React from 'react';
import { Button, Popover } from '../../src';

import { storiesOf, action, linkTo } from '@kadira/storybook';
const options = {
  inline: true,

}

const content = (
  <div>
    <p>内容1</p>
    <p>内容2</p>
  </div>
);
storiesOf('气泡卡片', module)
  .addWithInfo(
    '默认卡片', 
    () => (
     <Popover content={content} title="Title" trigger="hover" placement="topLeft">
      <a>Hover me</a>
    </Popover>
  ), options)

