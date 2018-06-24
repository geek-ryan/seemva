import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext({
  register: (username, password, email, profile) => {},
});

class SignUpProvider extends Component {
  register = (username, password, email, profile) => {
    const res = serverAPI.post('/users/register');
    localStorage.setItem('token', res.data.token);
  };

  render() {
    const value = {};
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { SignUpProvider, Consumer as SignUpConsumer };
