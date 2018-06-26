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
    <SignUpProfilePC imageUrl="https://avatars0.githubusercontent.com/u/15900134?s=400&u=b92f6ec77681a5c7065a0811d2453f4c5f694a19&v=4" />
  ));
