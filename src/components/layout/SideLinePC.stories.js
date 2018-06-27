import React from 'react';
import '../../../node_modules/antd/dist/antd.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SideLinePC from './SideLinePC';

storiesOf('SignUp PC', module).add('default', () => <SideLinePC />);
