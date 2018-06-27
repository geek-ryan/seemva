import React, { Component } from 'react';
import { Form, Input, Icon, Button, Alert } from 'antd';

import PasswordTogglePC from './PasswordTogglePC';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SingUpPC extends Component {
  static defaultProps = {
    errorCode: 0,
    onSubmitRegister: () => {},
  };

  state = {
    confirmDirty: false,
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmitRegister(values);
      }
    });
  };

  validateUsedUserName = (rule, value, callback) => {
    console.log(this.state.confirmDirty);
    this.setState(prevState => ({
      confirmDirty: prevState && !!this.props.onBlurUserName(value),
    }));
    if (value && this.state.confirmDirty) {
      callback('The name is already used...');
    } else {
      callback();
    }
  };

  render() {
    const { errorCode } = this.props;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');
    const usernameError =
      isFieldTouched('username') && getFieldError('username');
    const passwordError =
      isFieldTouched('password') && getFieldError('password');
    return (
      <div>
        {errorCode === 400 ? (
          <Alert
            message="The name is already used..."
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
        <h2>Creat New Account</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  type: 'email',
                  message: 'The input is not valid E-mail',
                },
              ],
            })(<Input prefix={<Icon type="mail" />} placeholder="email" />)}
          </FormItem>
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
            })(<Input prefix={<Icon type="user" />} placeholder="username" />)}
          </FormItem>
          <PasswordTogglePC
            passwordError={passwordError}
            getFieldDecorator={getFieldDecorator}
          />
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form__button"
              style={{ width: '100%' }}
              disabled={hasErrors(getFieldsError())}
            >
              Sign up
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(SingUpPC);
