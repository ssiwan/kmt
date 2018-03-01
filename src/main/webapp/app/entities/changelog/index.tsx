import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import Changelog from './changelog';
import ChangelogDetail from './changelog-detail';
import ChangelogDialog from './changelog-dialog';
import ChangelogDeleteDialog from './changelog-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={Changelog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={ChangelogDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={ChangelogDeleteDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={ChangelogDialog} />
      <Route exact path={`${match.url}/:id`} component={ChangelogDetail} />
    </Switch>
  </div>
);

export default Routes;
