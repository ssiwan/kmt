import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './engine.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IEngineDetailProps {
  getEntity: ICrudGetAction;
  engine: any;
  match: any;
}

export class EngineDetail extends React.Component<IEngineDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { engine } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="dhsKnowledgeManagementApp.engine.detail.title">Engine</Translate> [<b>{engine.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>
            <span id="number">
              <Translate contentKey="dhsKnowledgeManagementApp.engine.number">
              number
              </Translate>
            </span>
          </dt>
          <dd>
            {engine.number}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="dhsKnowledgeManagementApp.engine.status">
              status
              </Translate>
            </span>
          </dt>
          <dd>
            {engine.status}
          </dd>
        </dl>
        <Button tag={Link} to="/engine" replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    engine: storeState.engine.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(EngineDetail);
