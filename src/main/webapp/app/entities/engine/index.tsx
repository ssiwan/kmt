import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import Engine from './engine';
import EngineDetail from './engine-detail';
import EngineDialog from './engine-dialog';
import EngineDeleteDialog from './engine-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={Engine} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={EngineDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={EngineDeleteDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={EngineDialog} />
      <Route exact path={`${match.url}/:id`} component={EngineDetail} />
    </Switch>
  </div>
);

export default Routes;
