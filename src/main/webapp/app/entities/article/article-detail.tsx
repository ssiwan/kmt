import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './article.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IArticleDetailProps {
  getEntity: ICrudGetAction;
  article: any;
  match: any;
}

export class ArticleDetail extends React.Component<IArticleDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { article } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="dhsKnowledgeManagementApp.article.detail.title">Article</Translate> [<b>{article.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="dhsKnowledgeManagementApp.article.title">
              title
              </Translate>
            </span>
          </dt>
          <dd>
            {article.title}
          </dd>
          <dt>
            <span id="detail">
              <Translate contentKey="dhsKnowledgeManagementApp.article.detail">
              detail
              </Translate>
            </span>
          </dt>
          <dd>
            {article.detail}
          </dd>
          <dt>
            <span id="preview">
              <Translate contentKey="dhsKnowledgeManagementApp.article.preview">
              preview
              </Translate>
            </span>
          </dt>
          <dd>
            {article.preview}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="dhsKnowledgeManagementApp.article.status">
              status
              </Translate>
            </span>
          </dt>
          <dd>
            {article.status}
          </dd>
          <dt>
            <Translate contentKey="dhsKnowledgeManagementApp.article.attachment">
              Attachment
            </Translate>
          </dt>
          <dd>
  {
      (article.attachments) ?
          (article.attachments.map((val, i) =>
              <span key={val.id}><a>{val.name}</a>{(i === article.attachments.length - 1) ? '' : ', '}</span>
          )
      ) : null
  }
          </dd>
          <dt>
            <Translate contentKey="dhsKnowledgeManagementApp.article.tag">
              Tag
            </Translate>
          </dt>
          <dd>
  {
      (article.tags) ?
          (article.tags.map((val, i) =>
              <span key={val.id}><a>{val.name}</a>{(i === article.tags.length - 1) ? '' : ', '}</span>
          )
      ) : null
  }
          </dd>
          <dt>
            <Translate contentKey="dhsKnowledgeManagementApp.article.station">
              Station
            </Translate>
          </dt>
          <dd>
  {
      (article.stations) ?
          (article.stations.map((val, i) =>
              <span key={val.id}><a>{val.name}</a>{(i === article.stations.length - 1) ? '' : ', '}</span>
          )
      ) : null
  }
          </dd>
          <dt>
            <Translate contentKey="dhsKnowledgeManagementApp.article.engine">
              Engine
            </Translate>
          </dt>
          <dd>
  {
      (article.engines) ?
          (article.engines.map((val, i) =>
              <span key={val.id}><a>{val.number}</a>{(i === article.engines.length - 1) ? '' : ', '}</span>
          )
      ) : null
  }
          </dd>
          <dt>
            <Translate contentKey="dhsKnowledgeManagementApp.article.changelog">
              Changelog
            </Translate>
          </dt>
          <dd>
  {
      (article.changelogs) ?
          (article.changelogs.map((val, i) =>
              <span key={val.id}><a>{val.id}</a>{(i === article.changelogs.length - 1) ? '' : ', '}</span>
          )
      ) : null
  }
          </dd>
        </dl>
        <Button tag={Link} to="/article" replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    article: storeState.article.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
