import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import Attachment from './attachment';
import AttachmentDetail from './attachment-detail';
import AttachmentDialog from './attachment-dialog';
import AttachmentDeleteDialog from './attachment-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={Attachment} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={AttachmentDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={AttachmentDeleteDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={AttachmentDialog} />
      <Route exact path={`${match.url}/:id`} component={AttachmentDetail} />
    </Switch>
  </div>
);

export default Routes;
