import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loadable from './Loadable';

const AsyncHome = Loadable({ loader: () => import('pages/Home') });

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={AsyncHome} />
      <Route render={() => <div>404 page</div>} />
    </Switch>
  </Router>
);

export default App;
