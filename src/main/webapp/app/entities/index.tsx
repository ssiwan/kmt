import * as React from 'react';
// tslint:disable-next-line:no-unused-variable
import { Route, Switch } from 'react-router-dom';

import Station from './station';
import Engine from './engine';
import Changelog from './changelog';
import Tag from './tag';
import Attachment from './attachment';
import Article from './article';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route path={'/station'} component={Station}/>
      <Route path={'/engine'} component={Engine}/>
      <Route path={'/changelog'} component={Changelog}/>
      <Route path={'/tag'} component={Tag}/>
      <Route path={'/attachment'} component={Attachment}/>
      <Route path={'/article'} component={Article}/>
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
