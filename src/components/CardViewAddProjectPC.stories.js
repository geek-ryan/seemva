import React from 'react';
// import '../index.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import CardViewAddProjectPC from './CardViewAddProjectPC';

storiesOf('CardViewAddProjectPC', module).add('default', () => (
  <CardViewAddProjectPC />
));
