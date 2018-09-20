import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import DatePickerDemo from './date_picker'
import withReadme from 'storybook-readme/with-readme';
const options = {
  inline: true, propTables: false
}

storiesOf('DatePicker 日期选择', module)
  .addWithInfo('默认列表', () => (
    <div>
      <DatePickerDemo />
    </div>
  ), options)