import React from 'react';
import { AuthConsumer } from '../contexts/AuthCTX';

export default function withUserMe(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <AuthConsumer>
          {({ id, username }) => (
            <WrappedComponent {...this.props} userId={id} username={username} />
          )}
        </AuthConsumer>
      );
    }
  };
}
