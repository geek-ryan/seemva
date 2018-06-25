import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext({
  register: (username, password, email, profile) => {},
});

class AuthProvider extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    await this.fetchUser();
  }

  async fetchUser() {
    const res = await serverAPI.get('/users');
    this.setState({
      users: res.data,
    });
  }

  register = async (username, password, email, profile) => {
    const res = await serverAPI.post('/users/register', {
      username,
      password,
      email,
      profile,
    });
    localStorage.setItem('token', `Bearer ${res.data.token}`);
  };

  login = async (username, password) => {
    const res = await serverAPI.post('/users/login', {
      username,
      password,
    });
    localStorage.setItem('token', `Bearer ${res.data.token}`);
  };

  render() {
    const value = {
      register: this.register,
      login: this.login,
      users: this.state.users,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { AuthProvider, Consumer as AuthConsumer };
