import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './pages/Home';
import { Room } from './pages/Room';

class App extends Component {
  render() {
    return (
      <Switch key="routes">
        <Route exact path="/" component={Home} />
        <Route path="/room" component={Room} />
      </Switch>
    );
  }
}

export default App;
