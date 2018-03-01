import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './attachment.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IAttachmentDetailProps {
  getEntity: ICrudGetAction;
  attachment: any;
  match: any;
}

export class AttachmentDetail extends React.Component<IAttachmentDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { attachment } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="dhsKnowledgeManagementApp.attachment.detail.title">Attachment</Translate> [<b>{attachment.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="dhsKnowledgeManagementApp.attachment.name">
              name
              </Translate>
            </span>
          </dt>
          <dd>
            {attachment.name}
          </dd>
          <dt>
            <span id="file">
              <Translate contentKey="dhsKnowledgeManagementApp.attachment.file">
              file
              </Translate>
            </span>
          </dt>
          <dd>
            {attachment.file}
          </dd>
        </dl>
        <Button tag={Link} to="/attachment" replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    attachment: storeState.attachment.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentDetail);
