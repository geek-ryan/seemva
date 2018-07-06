import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import TeamEditButtonPC from './TeamEditButtonPC';

storiesOf('TeamEditButtonPC', module).add('default', () => {
  return <TeamEditButtonPC />;
});
