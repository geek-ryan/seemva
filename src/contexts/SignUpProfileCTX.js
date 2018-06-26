import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext({
  register: (username, password, email, profile) => {},
});

class SignUpProfileProvider extends Component {
  render() {
    return <Provider />;
  }
}

export { SignUpProfileProvider, Consumer as SignUpProfileConsumer };
