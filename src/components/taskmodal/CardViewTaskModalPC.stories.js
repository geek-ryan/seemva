import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import CardViewTaskModalPC from './CardViewTaskModalPC';

storiesOf('CardViewTaskModalPC', module).add('default', () => (
  <CardViewTaskModalPC />
));
