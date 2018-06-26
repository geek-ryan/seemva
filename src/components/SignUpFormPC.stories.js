import React from 'react';
import '../../node_modules/antd/dist/antd.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SignUpFormPC from './SignUpFormPC';

storiesOf('SignUpForm PC', module).add('with text', () => <SignUpFormPC />);
