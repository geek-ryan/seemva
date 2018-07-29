import React, { Component } from 'react';

import MemberGroupPC from '../utils/MemberGroupPC';
import MemberGroupCC from '../../containers/MemberGroupCC';

class HeaderPC extends Component {
  static defaultProps = {
    teamID: 0,
    teamname: '',
  };

  render() {
    const { teamname } = this.props;
    return (
      <header className="header">
        <h2 className="header__team-name">{teamname}</h2>
        {this.props.teamCurrent > 0 && (
          <MemberGroupCC {...this.props} header={'yes'} />
        )}
      </header>
    );
  }
}
export default HeaderPC;
