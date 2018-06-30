import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { ProfileProvider } from './contexts/ProfileCTX';
import { AuthProvider } from './contexts/AuthCTX';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import TeamPage from './pages/TeamPage';
import withProgressBar from './hocs/withProgressBar';

const withTeam = withProgressBar(TeamPage);

class App extends Component {
  render() {
    return (
      <Router>
        <ProfileProvider>
          <AuthProvider>
            <div className="App">
              <Switch>
                <Route path="/sign_up" component={SignUpPage} />
                <Route path="/login" component={LoginPage} />
                <Route exact path="/card" component={withTeam} />
                <Route path="/card/:id" component={TeamPage} />
                <Route
                  exact
                  path="/"
                  render={() =>
                    localStorage.getItem('token') ? (
                      <Redirect to="/card" />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
              </Switch>
            </div>
          </AuthProvider>
        </ProfileProvider>
      </Router>
    );
  }
}

export default App;
