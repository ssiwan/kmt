import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import {
  getarticles,
  getEntities
} from './tag.reducer';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface ITagProps {
  getEntities: ICrudGetAction;
  tags: any[];
  getarticles: ICrudGetAction;
  match: any;
}

export class Tag extends React.Component<ITagProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getarticles();
  }

  render() {
    const { tags, match } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="dhsKnowledgeManagementApp.tag.home.title">Tags</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="dhsKnowledgeManagementApp.tag.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th ><Translate contentKey="dhsKnowledgeManagementApp.tag.name">Name</Translate> <span className="fa fa-sort"/></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                tags.map((tag, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tag.id}`} color="link" size="sm">
                      {tag.id}
                    </Button>
                  </td>
                  <td>
                    {tag.name}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tag.id}`} color="info" size="sm">
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tag.id}/edit`} color="primary" size="sm">
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tag.id}/delete`} color="danger" size="sm">
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
  tags: storeState.tag.entities
});

const mapDispatchToProps = { getarticles, getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
