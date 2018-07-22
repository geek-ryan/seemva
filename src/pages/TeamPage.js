import React from 'react';
import { Route, Switch } from 'react-router-dom';

import withAuth from '../hocs/withAuth';
import { TeamProvider } from '../contexts/TeamCTX';
import { MemberProvider } from '../contexts/MemberCTX';
import { LabelProvider } from '../contexts/LabelCTX';
import { TaskProvider } from '../contexts/TaskCTX';
import { ActivityProvider } from '../contexts/ActivityCTX';
import { ProjectProvider } from '../contexts/ProjectCTX';

import SideNavCC from '../containers/SideNavCC';
import HeaderCC from '../containers/HeaderCC';
import CardViewPage from '../pages/CardViewPage';
import IntroPage from '../pages/IntroPage';
import TimelinePage from '../pages/TimelinePage';

import { connect } from 'react-redux';
import { currentUser, currentTeam } from '../actions';

// function TeamPage({ match }) {
//   return (
//     <TeamProvider teamID={match.params.id}>
//       <MemberProvider teamID={match.params.id}>
//         <LabelProvider teamID={match.params.id}>
//           <ProjectProvider teamID={match.params.id}>
//             <TaskProvider teamID={match.params.id}>
//               <ActivityProvider>
//                 <div className="team-page">
//                   <SideNavCC teamID={match.url} />
//                   <div className="team-content">
//                     <HeaderCC />
//                     <Switch>
//                       <Route exact path="/card" component={IntroPage} />
//                       <Route exact path="/tl" component={IntroPage} />
//                       <Route path="/card/:id" component={CardView} />
//                       {/* <Route path="/tl/:id" component={Timeline} /> */}
//                     </Switch>
//                   </div>
//                 </div>
//               </ActivityProvider>
//             </TaskProvider>
//           </ProjectProvider>
//         </LabelProvider>
//       </MemberProvider>
//     </TeamProvider>
//   );
// }

// function CardView({ match }) {
//   return (
//     <div className="team-card">
//       <div className="team-card__list">
//         <CardViewPage teamCurrent={parseInt(match.params.id)} />
//       </div>
//     </div>
//   );
// }

// function Timeline({ match }) {
//   return (
//     <div className="team-card">
//       <div className="team-card__list">
//         <TimelinePage {...this.props} teamCurrent={match.params.id} />
//       </div>
//     </div>
//   );
// }

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
        <TeamProvider teamID={this.props.match.params.id}>
          <MemberProvider teamID={this.props.match.params.id}>
            <LabelProvider teamID={this.props.match.params.id}>
              <ProjectProvider teamID={this.props.match.params.id}>
                <TaskProvider teamID={this.props.match.params.id}>
                  <ActivityProvider>
                    <div className="team-page">
                      <SideNavCC teamID={this.props.match.url} />
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
                  </ActivityProvider>
                </TaskProvider>
              </ProjectProvider>
            </LabelProvider>
          </MemberProvider>
        </TeamProvider>
      </React.Fragment>
    );
  }
}

export default connect()(withAuth(TeamPage));
