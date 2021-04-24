import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/Main';
import TeamPage from './pages/Team';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/team" exact component={TeamPage} />
      </Switch>
    </BrowserRouter>
  );
}