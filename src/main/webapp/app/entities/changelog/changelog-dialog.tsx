import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './changelog.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from '../../shared/util/date-utils';

export interface IChangelogDialogProps {
  getEntity: ICrudGetAction;
  updateEntity: ICrudPutAction;
  createEntity: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  changelog: any;
  users: any[];
  articles: any[];
  match: any;
  history: any;
}

export interface IChangelogDialogState {
  showModal: boolean;
  isNew: boolean;
  userId: number;
  articleId: number;
}

export class ChangelogDialog extends React.Component<IChangelogDialogProps, IChangelogDialogState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      userId: 0,
      articleId: 0,
      showModal: true
    };
  }

  componentDidMount() {
    !this.state.isNew && this.props.getEntity(this.props.match.params.id);
  }

  saveEntity = (event, errors, values) => {
    values.modified = new Date(values.modified);
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
    this.props.history.push('/changelog');
  }

  userUpdate = element => {
    const login = element.target.value;
    for (const i in this.props.users) {
        if (login.toString() === this.props.users[i].login.toString()) {
            this.setState({
                userId: this.props.users[i].id
            });
        }
    }
  }

  render() {
    const isInvalid = false;
    const { changelog, users, articles, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <Modal isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose} size="lg">
      <ModalHeader toggle={this.handleClose}>
        <Translate contentKey="dhsKnowledgeManagementApp.changelog.home.createOrEditLabel">Create or edit a Changelog</Translate>
      </ModalHeader>
      { loading ? <p>Loading...</p>
      : <AvForm model={isNew ? {} : changelog} onSubmit={this.saveEntity} >
          <ModalBody>
            { changelog.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label id="modifiedLabel" for="modified">
                <Translate contentKey="dhsKnowledgeManagementApp.changelog.modified">
                  modified
                </Translate>
              </Label>
              <AvInput
                type="datetime-local" className="form-control" name="modified"
                value={convertDateTimeFromServer(this.props.changelog.modified)} required
              />
              <AvFeedback>This field is required.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="user.login">
                <Translate contentKey="dhsKnowledgeManagementApp.changelog.user">User</Translate>
              </Label>
                  <AvInput type="select"
                    className="form-control"
                    name="userId"
                    onChange={this.userUpdate}>
                    <option value="" key="0" />
                    {
                      users.map(otherEntity =>
                        <option
                          value={otherEntity.id}
                          key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      )
                    }
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
  changelog: storeState.changelog.entity,
  users: storeState.changelog.users,
  articles: storeState.changelog.articles,
  loading: storeState.changelog.loading,
  updating: storeState.changelog.updating
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(ChangelogDialog);
