import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SignUpFormPC from './SignUpFormPC';

const users = [{ username: 'jojo' }, { username: 'loki' }, { username: 'fds' }];

storiesOf('SignUp PC', module)
  .add('empty', () => <SignUpFormPC />)
  .add('used name', () => (
    <SignUpFormPC
      onBlurUserName={username =>
        users.some(user => user.username === username)
      }
    />
  ));
