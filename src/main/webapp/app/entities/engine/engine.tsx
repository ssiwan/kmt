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
} from './engine.reducer';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IEngineProps {
  getEntities: ICrudGetAction;
  engines: any[];
  getarticles: ICrudGetAction;
  match: any;
}

export class Engine extends React.Component<IEngineProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getarticles();
  }

  render() {
    const { engines, match } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="dhsKnowledgeManagementApp.engine.home.title">Engines</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="dhsKnowledgeManagementApp.engine.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th ><Translate contentKey="dhsKnowledgeManagementApp.engine.number">Number</Translate> <span className="fa fa-sort"/></th>
                <th ><Translate contentKey="dhsKnowledgeManagementApp.engine.status">Status</Translate> <span className="fa fa-sort"/></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                engines.map((engine, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${engine.id}`} color="link" size="sm">
                      {engine.id}
                    </Button>
                  </td>
                  <td>
                    {engine.number}
                  </td>
                  <td>
                    {engine.status}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${engine.id}`} color="info" size="sm">
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${engine.id}/edit`} color="primary" size="sm">
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${engine.id}/delete`} color="danger" size="sm">
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
  engines: storeState.engine.entities
});

const mapDispatchToProps = { getarticles, getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(Engine);
