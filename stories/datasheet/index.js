import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import withReadme from 'storybook-readme/with-readme';
import datasheetReadme from './datasheet.md';
import DataSheetDemo from './datasheet';
const options = {
  inline: true,
  propTables: false,
  source: false
}

storiesOf('数据矩阵', module)
  .addDecorator(withReadme(datasheetReadme))
  .addWithInfo(
    '按钮样式',
    () => (
      <div className="test-datasheet" style={{width: 1000, margin: 'auto', height: 220 }}>
        <DataSheetDemo />
      </div>
  ), options)
