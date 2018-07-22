import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { ProfileProvider } from './contexts/ProfileCTX';
import { AuthProvider, AuthConsumer } from './contexts/AuthCTX';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import TeamPage from './pages/TeamPage';

import { currentUser } from './actions';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Router>
        <ProfileProvider>
          <AuthProvider>
            <AuthConsumer>
              {({ userCurrent }) => {
                this.props.dispatch(currentUser(userCurrent));
                return (
                  <div className="App">
                    <Switch>
                      <Route path="/sign_up" component={SignUpPage} />
                      <Route path="/login" component={LoginPage} />
                      <Route exact path="/card" component={TeamPage} />
                      <Route exact path="/tl" component={TeamPage} />
                      <Route path="/card/:id" component={TeamPage} />
                      <Route path="/tl/:id" component={TeamPage} />
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
                );
              }}
            </AuthConsumer>
          </AuthProvider>
        </ProfileProvider>
      </Router>
    );
  }
}

export default connect()(App);
