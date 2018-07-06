import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext({
  register: (username, password, email, profile) => {},
  login: (username, password) => {},
  logout: () => {},
});

class AuthProvider extends Component {
  state = {
    users: [],
    loading: false,
    id: null,
    username: '',
    profile: '',
  };

  async componentDidMount() {
    if (localStorage.getItem('token')) {
      await this.fetchMe();
    } else {
      await this.fetchUser();
    }
  }

  async fetchMe() {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.get('/me');
      this.setState({
        id: res.data.id,
        username: res.data.username,
        profile: res.data.profile,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  async fetchUser() {
    const res = await serverAPI.get('/users');
    this.setState({
      users: res.data,
    });
  }

  register = async ({ username, password, email, profile }) => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.post('/users/register', {
        username,
        password,
        email,
        profile,
      });
      localStorage.setItem('token', res.data.token);
      await this.fetchMe();
    } finally {
      this.setState({ loading: false });
    }
  };

  login = async (username, password) => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.post('/users/login', {
        username,
        password,
      });
      localStorage.setItem('token', res.data.token);
      await this.fetchMe();
    } finally {
      this.setState({ loading: true });
    }
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      id: null,
      username: null,
    });
  };

  render() {
    const value = {
      ...this.state,
      register: this.register,
      login: this.login,
      logout: this.logout,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { AuthProvider, Consumer as AuthConsumer };
