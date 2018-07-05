import React, { Component } from 'react';

const withPolling = WrappedComponent =>
  class extends Component {
    componentDidMount() {}
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withPolling;
