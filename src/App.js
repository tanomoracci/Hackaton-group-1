import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './pages/Home';

class App extends Component {
  render() {
    return (
      <Switch key="routes">
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
}

export default App;
