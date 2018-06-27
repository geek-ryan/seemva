import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { addDecorator } from '@storybook/react/dist/client/preview';

import { Form } from 'antd';
import PasswordTogglePC from './PasswordTogglePC';

class FormComponent extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <PasswordTogglePC getFieldDecorator={getFieldDecorator} />
      </Form>
    );
  }
}

const WrappedComponent = Form.create()(FormComponent);

storiesOf('Password toggle PC', module).add('empty', () => (
  <WrappedComponent />
));
