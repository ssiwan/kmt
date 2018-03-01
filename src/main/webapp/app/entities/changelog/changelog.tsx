import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import {
  getusers,
  getarticles,
  getEntities
} from './changelog.reducer';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IChangelogProps {
  getEntities: ICrudGetAction;
  changelogs: any[];
  getusers: ICrudGetAction;
  getarticles: ICrudGetAction;
  match: any;
}

export class Changelog extends React.Component<IChangelogProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getusers();
    this.props.getarticles();
  }

  render() {
    const { changelogs, match } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="dhsKnowledgeManagementApp.changelog.home.title">Changelogs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="dhsKnowledgeManagementApp.changelog.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th ><Translate contentKey="dhsKnowledgeManagementApp.changelog.modified">Modified</Translate> <span className="fa fa-sort"/></th>
                <th ><Translate contentKey="dhsKnowledgeManagementApp.changelog.user">User</Translate> <span className="fa fa-sort"/></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                changelogs.map((changelog, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${changelog.id}`} color="link" size="sm">
                      {changelog.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={changelog.modified} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {changelog.userLogin ? changelog.userLogin : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${changelog.id}`} color="info" size="sm">
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${changelog.id}/edit`} color="primary" size="sm">
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${changelog.id}/delete`} color="danger" size="sm">
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
  changelogs: storeState.changelog.entities
});

const mapDispatchToProps = { getusers, getarticles, getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(Changelog);
