import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ViewAllTasksPC from './ViewAllTasksPC';

storiesOf('ViewAllTasksPC', module).add('default', () => <ViewAllTasksPC />);
