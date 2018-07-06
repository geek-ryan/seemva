import React from 'react';

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import TeamMenuPC from './TeamMenuPC';

storiesOf('TeamMenuPC', module)
  .addDecorator(StoryRouter())
  .add('default', () => {
    const teams = [
      {
        id: 1, // team의 id
        name: 'team1',
        admin: true,
      },
      {
        id: 2,
        name: 'fds-team2',
        admin: false,
      },
    ];
    return <TeamMenuPC teams={teams} />;
  });
