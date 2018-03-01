import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import {
  getattachments,
  gettags,
  getstations,
  getengines,
  getchangelogs,
  getEntities
} from './article.reducer';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IArticleProps {
  getEntities: ICrudGetAction;
  articles: any[];
  getattachments: ICrudGetAction;
  gettags: ICrudGetAction;
  getstations: ICrudGetAction;
  getengines: ICrudGetAction;
  getchangelogs: ICrudGetAction;
  match: any;
}

export class Article extends React.Component<IArticleProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getattachments();
    this.props.gettags();
    this.props.getstations();
    this.props.getengines();
    this.props.getchangelogs();
  }

  render() {
    const { articles, match } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="dhsKnowledgeManagementApp.article.home.title">Articles</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="dhsKnowledgeManagementApp.article.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th ><Translate contentKey="dhsKnowledgeManagementApp.article.title">Title</Translate> <span className="fa fa-sort"/></th>
                <th ><Translate contentKey="dhsKnowledgeManagementApp.article.detail">Detail</Translate> <span className="fa fa-sort"/></th>
                <th ><Translate contentKey="dhsKnowledgeManagementApp.article.preview">Preview</Translate> <span className="fa fa-sort"/></th>
                <th ><Translate contentKey="dhsKnowledgeManagementApp.article.status">Status</Translate> <span className="fa fa-sort"/></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                articles.map((article, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${article.id}`} color="link" size="sm">
                      {article.id}
                    </Button>
                  </td>
                  <td>
                    {article.title}
                  </td>
                  <td>
                    {article.detail}
                  </td>
                  <td>
                    {article.preview}
                  </td>
                  <td>
                    {article.status}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${article.id}`} color="info" size="sm">
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${article.id}/edit`} color="primary" size="sm">
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${article.id}/delete`} color="danger" size="sm">
                        <FaTrash/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.delete" /></span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  articles: storeState.article.entities
});

const mapDispatchToProps = { getattachments, gettags, getstations, getengines, getchangelogs, getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(Article);
