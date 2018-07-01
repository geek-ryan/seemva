import React, { Component } from 'react';
import { UserConsumer } from '../contexts/UserCTX';

export default function withUser(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <UserConsumer>
          {({ userState, userFunc }) => (
            <WrappedComponent
              {...this.props}
              userState={userState}
              userFunc={userFunc}
            />
          )}
        </UserConsumer>
      );
    }
  };
}
