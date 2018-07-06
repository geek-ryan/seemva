import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import LoginFormPC from './LoginFormPC';

storiesOf('Login PC', module).add('empty', () => <LoginFormPC />);
