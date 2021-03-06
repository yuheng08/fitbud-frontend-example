import React, { Component } from 'react';
import MainNav from './MainNav';
import Home from './Home';
import Login from './Login';
import Listings from './Listings';
import NoMatch from './NoMatch';
import data from '../sampleData';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    }
  }

  handleAuthenticated = () => {
    this.setState({authenticated: true});
    console.log('User authenticated...');
  }

  handleSignOff = () => {
    this.setState({authenticated: false});
    console.log('User signed off...');
  }

  render() {
    return (
      <Router>
        <div>
          <MainNav authenticate={this.handleAuthenticated} isAuthed={this.state.authenticated} 
                   signoff={this.handleSignOff} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/listings' render={props => (
              <Listings listings={data} />
            )} />
            <Route exact path='/login' render={props => (
              <Login authenticate={this.handleAuthenticated} {...props} />
            )} />
            <Redirect from='/test' to='/listings' />

            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
