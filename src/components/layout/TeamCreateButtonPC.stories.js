import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import TeamCreateButtonPC from './TeamCreateButtonPC';

storiesOf('TeamCreateButtonPC', module).add('default', () => {
  return <TeamCreateButtonPC />;
});
