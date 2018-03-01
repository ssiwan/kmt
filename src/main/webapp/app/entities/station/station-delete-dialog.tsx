import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FaBan, FaTrash } from 'react-icons/lib/fa';

import { getEntity, deleteEntity } from './station.reducer';

export interface IStationDeleteDialogProps {
  getEntity: ICrudGetAction;
  deleteEntity: ICrudDeleteAction;
  station: any;
  match: any;
  history: any;
}

export interface IStationDeleteDialogState {
  showModal: boolean;
}
export class StationDeleteDialog extends React.Component<IStationDeleteDialogProps, IStationDeleteDialogState> {

  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = () => {
    this.props.deleteEntity(this.props.station.id);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
        showModal: false
    });
    this.props.history.push('/station');
  }

  render() {
    const { station } = this.props;
    const { showModal } = this.state;
    return (
      <Modal
        isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose}
      >
      <ModalHeader toggle={this.handleClose}><Translate contentKey="entity.delete.title">Confirm delete operation</Translate></ModalHeader>
      <ModalBody>
        <Translate contentKey="dhsKnowledgeManagementApp.station.delete.question" interpolate={{ id: station.id }}>
            Are you sure you want to delete this Station?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={this.handleClose}>
          <FaBan/>&nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button color="danger" onClick={this.confirmDelete}>
          <FaTrash/>&nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
    station: storeState.station.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(StationDeleteDialog);
