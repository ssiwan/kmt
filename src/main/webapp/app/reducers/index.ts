import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import layout from './layout';
import authentication from './authentication';
import administration from './administration';
import userManagement from './user-management';
import station from '../entities/station/station.reducer';
import engine from '../entities/engine/engine.reducer';
import changelog from '../entities/changelog/changelog.reducer';
import tag from '../entities/tag/tag.reducer';
import attachment from '../entities/attachment/attachment.reducer';
import article from '../entities/article/article.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export default combineReducers({
  authentication,
  locale,
  layout,
  administration,
  userManagement,
  station,
  engine,
  changelog,
  tag,
  attachment,
  article,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});
