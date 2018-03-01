import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import Station from './station';
import StationDetail from './station-detail';
import StationDialog from './station-dialog';
import StationDeleteDialog from './station-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={Station} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={StationDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={StationDeleteDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={StationDialog} />
      <Route exact path={`${match.url}/:id`} component={StationDetail} />
    </Switch>
  </div>
);

export default Routes;
