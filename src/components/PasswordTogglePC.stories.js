import React from 'react';
import '../index.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { addDecorator } from '@storybook/react/dist/client/preview';

import { Form } from 'antd';
import PasswordTogglePC from './PasswordTogglePC';

storiesOf('Password toggle PC', module).add('empty', () => (
  <PasswordTogglePC />
));
