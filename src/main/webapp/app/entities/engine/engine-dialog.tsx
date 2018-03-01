import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './engine.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from '../../shared/util/date-utils';

export interface IEngineDialogProps {
  getEntity: ICrudGetAction;
  updateEntity: ICrudPutAction;
  createEntity: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  engine: any;
  articles: any[];
  match: any;
  history: any;
}

export interface IEngineDialogState {
  showModal: boolean;
  isNew: boolean;
  articleId: number;
}

export class EngineDialog extends React.Component<IEngineDialogProps, IEngineDialogState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      articleId: 0,
      showModal: true
    };
  }

  componentDidMount() {
    !this.state.isNew && this.props.getEntity(this.props.match.params.id);
  }

  saveEntity = (event, errors, values) => {
    if (this.state.isNew) {
      this.props.createEntity(values);
    } else {
      this.props.updateEntity(values);
    }
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
        showModal: false
    });
    this.props.history.push('/engine');
  }

  render() {
    const isInvalid = false;
    const { engine, articles, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <Modal isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose} size="lg">
      <ModalHeader toggle={this.handleClose}>
        <Translate contentKey="dhsKnowledgeManagementApp.engine.home.createOrEditLabel">Create or edit a Engine</Translate>
      </ModalHeader>
      { loading ? <p>Loading...</p>
      : <AvForm model={isNew ? {} : engine} onSubmit={this.saveEntity} >
          <ModalBody>
            { engine.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label id="numberLabel" for="number">
                <Translate contentKey="dhsKnowledgeManagementApp.engine.number">
                  number
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="number" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label id="statusLabel">
                <Translate contentKey="dhsKnowledgeManagementApp.engine.status">
                  status
                </Translate>
              </Label>
              <AvInput type="select"
                className="form-control"
                name="status"
              >
                <option value="READY">
                    READY
                </option>
                <option value="UNSTAFFED">
                    UNSTAFFED
                </option>
                <option value="OUTOFSERVICE">
                    OUTOFSERVICE
                </option>
                <option value="INTRANSIT">
                    INTRANSIT
                </option>
              </AvInput>
            </AvGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleClose}>
              <FaBan/>&nbsp;
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>
            <Button color="primary" type="submit" disabled={isInvalid || updating}>
              <FaFloppyO/>&nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </ModalFooter>
        </AvForm>
      }
    </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  engine: storeState.engine.entity,
  articles: storeState.engine.articles,
  loading: storeState.engine.loading,
  updating: storeState.engine.updating
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(EngineDialog);
