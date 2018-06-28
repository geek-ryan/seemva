import React from 'react';
// ;

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SidebarOpenButtonPC from './SidebarOpenButtonPC';

storiesOf('SidebarOpenButtonPC', module).add('default', () => (
  <SidebarOpenButtonPC />
));
