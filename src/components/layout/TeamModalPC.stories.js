import React from 'react';

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import TeamModalPC from './TeamModalPC';

storiesOf('TeamModalPC', module)
  .addDecorator(StoryRouter())
  .add('default', () => <TeamModalPC visible={true} />);
