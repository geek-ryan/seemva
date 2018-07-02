import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import TeamLeaveButtonPC from './TeamLeaveButtonPC';

storiesOf('TeamLeaveButtonPC', module).add('default', () => {
  return <TeamLeaveButtonPC />;
});
