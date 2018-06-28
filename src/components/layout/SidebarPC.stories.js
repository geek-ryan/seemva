import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SidebarPC from './SidebarPC';

storiesOf('SidebarPC', module).add('default', () => <SidebarPC />);
