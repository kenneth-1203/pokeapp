import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './components/layout/Dashboard';
import Pokemon from './components/pokemon/Pokemon';

import './main.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;