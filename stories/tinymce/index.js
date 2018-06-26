import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Tinymce  from './tinymce';

// import { Tooltip,  Button } from '../../src';
import withReadme from 'storybook-readme/with-readme';
const options = {
  inline: false
}
const rawContent = '<p data-me="123">bdbdbdbdbd</p>'
storiesOf('富文本', module)
  // .addDecorator(withReadme(listReadme))
  .addWithInfo('默认列表', () => (
   <Tinymce />
 ), { inline: false })
