import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext({
  register: (username, password, email, profile) => {},
});

class AuthProvider extends Component {
  state = {
    users: [],
    loading: false,
    id: null,
    usernmae: null,
  };

  async componentDidMount() {
    if (this.state.loading) {
    } else {
      await this.fetchUser();
    }
  }

  async fetchMe() {
    this.setState(prevState => ({
      loading: prevState.loading + 1,
    }));
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
