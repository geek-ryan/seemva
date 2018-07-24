import React, { Component } from 'react';

import { TeamConsumer } from '../contexts/TeamCTX';
import { MemberConsumer } from '../contexts/MemberCTX';
import HeaderPC from '../components/layout/HeaderPC';

import { connect } from 'react-redux';

class HeaderCC extends Component {
  render() {
    return (
      <TeamConsumer>
        {({ current, teams }) => {
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
        }}
      </TeamConsumer>
    );
  }
}

const pullingTeams = state => {
  console.log('좀더 티를 내줄래', {
    teams: state.teamReducer,
    teamCurrent: state.currentReducer.teamId,
  });
  return { teams: state.teamReducer, teamCurrent: state.currentReducer.teamId };
};

export default connect(pullingTeams)(HeaderCC);
