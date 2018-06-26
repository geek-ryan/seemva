import React from 'react';
import '../index.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SignUpProfilePC from './SignUpProfilePC';

storiesOf('SignUp Profile', module)
  .add('empty', () => <SignUpProfilePC />)
  .add('loading', () => <SignUpProfilePC loading="true" />)
  .add('uploaded image', () => (
    <SignUpProfilePC profile="https://ucarecdn.com/42cb0754-f7d7-4f0d-b546-3a4195402409/jojo.jpg" />
  ));
