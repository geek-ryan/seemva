import React, { Component } from 'react';
import { UserProvider, UserConsumer } from '../contexts/UserCTX';

export default function withUserCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <UserProvider>
          <UserConsumer>
            {({ userState, userFunc }) => (
              <WrappedComponent
                userState={userState}
                userFunc={userFunc}
                {...this.props}
              />
            )}
          </UserConsumer>
        </UserProvider>
      );
    }
  };
}
