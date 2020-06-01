import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import Header from './Header';
import Home from './Home';
import Police from './Police';
import Cases from './Cases';

const history = createHistory();

const Main = () => (
  <main>
    <Router history={history}>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/cases" exact component={Cases} />
      <Route path="/police" exact component={Police} />
    </Router>
  </main>
);

export default Main;
