import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import Article from './article';
import ArticleDetail from './article-detail';
import ArticleDialog from './article-dialog';
import ArticleDeleteDialog from './article-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={Article} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={ArticleDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={ArticleDeleteDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={ArticleDialog} />
      <Route exact path={`${match.url}/:id`} component={ArticleDetail} />
    </Switch>
  </div>
);

export default Routes;
