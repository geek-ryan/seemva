import React, { Component } from 'react';

import { MemberConsumer } from '../contexts/MemberCTX';
import HeaderPC from '../components/layout/HeaderPC';

import { connect } from 'react-redux';

class HeaderCC extends Component {
  render() {
    return (
      <MemberConsumer>
        {value => {
          return (
            <HeaderPC
              teamname={
                this.props.teams.length && this.props.teamCurrent
                  ? this.props.teams.find(
                      team => team.id === this.props.teamCurrent
                    ).name
                  : 'Welcome SEEMVA'
              }
              {...value}
              teamCurrent={this.props.teamCurrent}
              onAutocompleteSearch={value.autocompleteSearch}
              onAddMember={value.addMember}
              onClearMatch={value.clearMatch}
              {...this.props}
            />
          );
        }}
      </MemberConsumer>
    );
  }
}

const pullingTeams = state => {
  return { teams: state.teamReducer, teamCurrent: state.currentReducer.teamId };
};

export default connect(pullingTeams)(HeaderCC);
