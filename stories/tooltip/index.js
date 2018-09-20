import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TooltipDeom from './tooltip.jsx';

// import { Tooltip,  Button } from '../../src';
import withReadme from 'storybook-readme/with-readme';
const options = {
  inline: true
}
storiesOf('Tooltip 提示信息', module)
  // .addDecorator(withReadme(listReadme))
  .addWithInfo('默认列表', () => (
   <TooltipDeom/>
  ), { inline: true })
