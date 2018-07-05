import React, { Component } from 'react';
import { UserConsumer } from '../contexts/UserCTX';

export default function withUserCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <UserConsumer>
          {({ userState, userFunc }) => (
            <WrappedComponent
              userState={userState}
              userFunc={userFunc}
              {...this.props}
            />
          )}
        </UserConsumer>
      );
    }
  };
}
