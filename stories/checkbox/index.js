import React from 'react';
import { Checkbox, Checkbox2 } from '../../src';
import CheckboxDemo from './checkbox'

import { storiesOf, action, linkTo } from '@kadira/storybook';
const options = {
  inline: true
}
storiesOf('复选框', module)
  .addWithInfo(
    '复选框1',
    () => (
      <CheckboxDemo />
  ), options);
