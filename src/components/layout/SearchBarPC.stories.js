import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SearchBarPC from './SearchBarPC';

storiesOf('SearchBarPC', module).add('default', () => <SearchBarPC />);
