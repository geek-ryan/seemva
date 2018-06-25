import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthCTX';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <div className="App">
            <Route path="/sign_up" component={SignUpPage} />
            <Route path="/login" component={LoginPage} />
            <Route exact path="/" component={Home} />
          </div>
        </AuthProvider>
      </Router>
    );
  }
}

function Home() {
  return <div>HOME</div>;
}

export default App;
