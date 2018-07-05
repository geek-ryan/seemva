import React, { Component } from 'react';

const withTeamMember = WrappedComponent =>
  class extends Component {
    componentDidMount() {}
    render() {
      return (
        <MemberConsumer>
          ()
          <WrappedComponent {...this.props} />;
        </MemberConsumer>
      );
    }
  };

export default withTeamMember;
