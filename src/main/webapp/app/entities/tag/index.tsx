import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import Tag from './tag';
import TagDetail from './tag-detail';
import TagDialog from './tag-dialog';
import TagDeleteDialog from './tag-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={Tag} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={TagDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={TagDeleteDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={TagDialog} />
      <Route exact path={`${match.url}/:id`} component={TagDetail} />
    </Switch>
  </div>
);

export default Routes;
