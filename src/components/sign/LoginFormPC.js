import React, { Component } from 'react';
import { Card, Form, Input, Icon, Button, Alert } from 'antd';

import PasswordTogglePC from './PasswordTogglePC';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginFormPC extends Component {
  static defaultProps = {
    errorCode: 0,
    onSubmitLogin: () => {},
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmitLogin(values);
      }
    });
  };

  render() {
    const { errorCode } = this.props;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const usernameError =
      isFieldTouched('username') && getFieldError('username');
    const passwordError =
      isFieldTouched('password') && getFieldError('password');
    console.log(getFieldsError());
    return (
      <React.Fragment>
        {errorCode === 400 ? (
          <Alert
            message="Please check your username and password, and try again"
            type="warning"
            showIcon
          />
        ) : errorCode === 500 ? (
          <Alert
            message="Network error : please try again later"
            type="error"
            showIcon
          />
        ) : (
          ''
        )}
        <Card title="Log in to SEEMVA" bordered={false} style={{ width: 300 }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              validateStatus={usernameError ? 'error' : ''}
              help={usernameError || ''}
            >
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Username',
                  },
                ],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" />}
                  placeholder="username"
                />
              )}
            </FormItem>
            <PasswordTogglePC
              passwordError={passwordError}
              getFieldDecorator={getFieldDecorator}
            />
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form__button"
              style={{ width: '100%' }}
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

export default Form.create()(LoginFormPC);
