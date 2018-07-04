import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { ProfileProvider } from './contexts/ProfileCTX';
import { AuthProvider } from './contexts/AuthCTX';
import { UserProvider } from './contexts/UserCTX';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import TeamPage from './pages/TeamPage';
import UnitTestPage from './pages/UnitTestPage';
import Timeline from './components/timeline/Timeline';
import TimelinePage from './pages/TimelinePage';

class App extends Component {
  render() {
    return (
      <Router>
        <ProfileProvider>
          <AuthProvider>
            <UserProvider>
              <div className="App">
                <Switch>
                  <Route path="/sign_up" component={SignUpPage} />
                  <Route path="/login" component={LoginPage} />
                  <Route exact path="/card" component={TeamPage} />
                  <Route path="/card/:id" component={TeamPage} />
                  <Route path="/test" component={UnitTestPage} />
                  <Route path="/tl" component={TimelinePage} />
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
            </UserProvider>
          </AuthProvider>
        </ProfileProvider>
      </Router>
    );
  }
}

export default App;
