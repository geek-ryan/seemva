import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MemberGroupPC from './MemberGroupPC';

storiesOf('MemberGroupPC', module)
  .add('empty', () => <MemberGroupPC />)
  .add('members', () => (
    <MemberGroupPC
      members={[
        {
          id: 1,
          username: 'fds',
          email: 'fds@seemva.com',
          profile:
            'https://ucarecdn.com/80280868-a954-4114-8dbc-cfcf5c9d23f5/IMG_3128.jpg',
        },
      ]}
    />
  ));
