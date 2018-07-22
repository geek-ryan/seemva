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
                      teams.length && current
                        ? teams.find(team => team.id === current).name
                        : 'Welcome SEEMVA'
                    }
                    {...value}
                    teamCurrent={current}
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
export default connect()(HeaderCC);
