import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './changelog.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IChangelogDetailProps {
  getEntity: ICrudGetAction;
  changelog: any;
  match: any;
}

export class ChangelogDetail extends React.Component<IChangelogDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { changelog } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="dhsKnowledgeManagementApp.changelog.detail.title">Changelog</Translate> [<b>{changelog.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>
            <span id="modified">
              <Translate contentKey="dhsKnowledgeManagementApp.changelog.modified">
              modified
              </Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={changelog.modified} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="dhsKnowledgeManagementApp.changelog.user">
              User
            </Translate>
          </dt>
          <dd>
              {changelog.userLogin ? changelog.userLogin : ''}
          </dd>
        </dl>
        <Button tag={Link} to="/changelog" replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    changelog: storeState.changelog.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(ChangelogDetail);
