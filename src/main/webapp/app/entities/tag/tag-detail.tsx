import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './tag.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface ITagDetailProps {
  getEntity: ICrudGetAction;
  tag: any;
  match: any;
}

export class TagDetail extends React.Component<ITagDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tag } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="dhsKnowledgeManagementApp.tag.detail.title">Tag</Translate> [<b>{tag.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="dhsKnowledgeManagementApp.tag.name">
              name
              </Translate>
            </span>
          </dt>
          <dd>
            {tag.name}
          </dd>
        </dl>
        <Button tag={Link} to="/tag" replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    tag: storeState.tag.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(TagDetail);
