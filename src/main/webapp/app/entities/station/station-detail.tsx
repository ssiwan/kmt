import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './station.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IStationDetailProps {
  getEntity: ICrudGetAction;
  station: any;
  match: any;
}

export class StationDetail extends React.Component<IStationDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { station } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="dhsKnowledgeManagementApp.station.detail.title">Station</Translate> [<b>{station.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="dhsKnowledgeManagementApp.station.name">
              name
              </Translate>
            </span>
          </dt>
          <dd>
            {station.name}
          </dd>
          <dt>
            <span id="county">
              <Translate contentKey="dhsKnowledgeManagementApp.station.county">
              county
              </Translate>
            </span>
          </dt>
          <dd>
            {station.county}
          </dd>
        </dl>
        <Button tag={Link} to="/station" replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    station: storeState.station.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(StationDetail);
