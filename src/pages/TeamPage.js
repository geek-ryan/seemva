import React from 'react';
import { Route, Switch } from 'react-router-dom';

import withAuth from '../hocs/withAuth';
import { MemberProvider } from '../contexts/MemberCTX';
import { LabelProvider } from '../contexts/LabelCTX';

import SideNavCC from '../containers/SideNavCC';
import HeaderCC from '../containers/HeaderCC';
import CardViewPage from '../pages/CardViewPage';
import IntroPage from '../pages/IntroPage';
import TimelinePage from '../pages/TimelinePage';

import { connect } from 'react-redux';
import { currentTeam } from '../actions';

class TeamPage extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(currentTeam(parseInt(this.props.match.params.id)));
  };

  render() {
    const CardView = () => {
      return (
        <div className="team-card">
          <div className="team-card__list">
            <CardViewPage
            // teamCurrent={parseInt(this.props.match.params.id)}
            />
          </div>
        </div>
      );
    };

    return (
      <React.Fragment>
        <MemberProvider>
          <LabelProvider>
            <div className="team-page">
              <SideNavCC />
              <div className="team-content">
                <HeaderCC />
                <Switch>
                  <Route exact path="/card" component={IntroPage} />
                  <Route exact path="/tl" component={IntroPage} />
                  <Route path="/card/:id" component={CardView} />
                  {/* <Route path="/tl/:id" component={Timeline} /> */}
                </Switch>
              </div>
            </div>
          </LabelProvider>
        </MemberProvider>
      </React.Fragment>
    );
  }
}

export default connect()(withAuth(TeamPage));
