import React from 'react';

import { storiesOf } from '@storybook/react';

import { Form } from 'antd';
import TeamModalPC from './TeamModalPC';

const WrappedComponent = Form.create()(TeamModalPC);

storiesOf('TeamModalPC', module).add('default', () => (
  <WrappedComponent visible={true} />
));
