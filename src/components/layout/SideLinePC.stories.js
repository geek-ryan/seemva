import React from 'react';
import '../../index.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SideLinePC from './SideLinePC';

storiesOf('SideLine PC', module).add('default', () => <SideLinePC />);
