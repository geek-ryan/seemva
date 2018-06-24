import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { SignUpProvider } from './contexts/SignUpCTX';
import SignUpPage from './pages/SignUpPage';

class App extends Component {
  render() {
    return (
      <Router>
        <SignUpProvider>
          <div className="App">
            <Route path="/sign_up" component={SignUpPage} />
            <Route exact path="/" component={Home} />
          </div>
        </SignUpProvider>
      </Router>
    );
  }
}

function Home() {
  return <div />;
}

export default App;
