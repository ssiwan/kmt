import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './article.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from '../../shared/util/date-utils';

export interface IArticleDialogProps {
  getEntity: ICrudGetAction;
  updateEntity: ICrudPutAction;
  createEntity: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  article: any;
  attachments: any[];
  tags: any[];
  stations: any[];
  engines: any[];
  changelogs: any[];
  match: any;
  history: any;
}

export interface IArticleDialogState {
  showModal: boolean;
  isNew: boolean;
  idsAttachment: any[];
  idsTag: any[];
  idsStation: any[];
  idsEngine: any[];
  idsChangelog: any[];
}

export class ArticleDialog extends React.Component<IArticleDialogProps, IArticleDialogState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      idsAttachment: [],
      idsTag: [],
      idsStation: [],
      idsEngine: [],
      idsChangelog: [],
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
    this.props.history.push('/article');
  }

  attachmentUpdate = element => {
    const name = element.target.value;
    const list = [];
    for (const i in element.target.selectedOptions) {
        if (element.target.selectedOptions[i]) {
            const prop = element.target.selectedOptions[i].value;
            for (const j in this.props.attachments) {
                if (prop === this.props.attachments[j].name) {
                    list.push(this.props.attachments[j]);
                }
            }
        }
    }
    this.setState({
        idsAttachment: list
    });
  }

  tagUpdate = element => {
    const name = element.target.value;
    const list = [];
    for (const i in element.target.selectedOptions) {
        if (element.target.selectedOptions[i]) {
            const prop = element.target.selectedOptions[i].value;
            for (const j in this.props.tags) {
                if (prop === this.props.tags[j].name) {
                    list.push(this.props.tags[j]);
                }
            }
        }
    }
    this.setState({
        idsTag: list
    });
  }

  stationUpdate = element => {
    const name = element.target.value;
    const list = [];
    for (const i in element.target.selectedOptions) {
        if (element.target.selectedOptions[i]) {
            const prop = element.target.selectedOptions[i].value;
            for (const j in this.props.stations) {
                if (prop === this.props.stations[j].name) {
                    list.push(this.props.stations[j]);
                }
            }
        }
    }
    this.setState({
        idsStation: list
    });
  }

  engineUpdate = element => {
    const number = element.target.value;
    const list = [];
    for (const i in element.target.selectedOptions) {
        if (element.target.selectedOptions[i]) {
            const prop = element.target.selectedOptions[i].value;
            for (const j in this.props.engines) {
                if (prop === this.props.engines[j].number) {
                    list.push(this.props.engines[j]);
                }
            }
        }
    }
    this.setState({
        idsEngine: list
    });
  }

  changelogUpdate = element => {
    const id = element.target.value;
    const list = [];
    for (const i in element.target.selectedOptions) {
        if (element.target.selectedOptions[i]) {
            const prop = element.target.selectedOptions[i].value;
            for (const j in this.props.changelogs) {
                if (prop === this.props.changelogs[j].id) {
                    list.push(this.props.changelogs[j]);
                }
            }
        }
    }
    this.setState({
        idsChangelog: list
    });
  }

  displayAttachment(value: any) {
    if (this.state.idsAttachment && this.state.idsAttachment.length !== 0) {
        const list = [];
        for (const i in this.state.idsAttachment) {
            if (this.state.idsAttachment[i]) {
                list.push(this.state.idsAttachment[i].name);
            }
        }
        return list;
    }
    if (value.attachments && value.attachments.length !== 0) {
        const list = [];
        for (const i in value.attachments) {
            if (value.attachments[i]) {
                list.push(value.attachments[i].name);
            }
        }
        return list;
    }
    return null;
  }

  displayTag(value: any) {
    if (this.state.idsTag && this.state.idsTag.length !== 0) {
        const list = [];
        for (const i in this.state.idsTag) {
            if (this.state.idsTag[i]) {
                list.push(this.state.idsTag[i].name);
            }
        }
        return list;
    }
    if (value.tags && value.tags.length !== 0) {
        const list = [];
        for (const i in value.tags) {
            if (value.tags[i]) {
                list.push(value.tags[i].name);
            }
        }
        return list;
    }
    return null;
  }

  displayStation(value: any) {
    if (this.state.idsStation && this.state.idsStation.length !== 0) {
        const list = [];
        for (const i in this.state.idsStation) {
            if (this.state.idsStation[i]) {
                list.push(this.state.idsStation[i].name);
            }
        }
        return list;
    }
    if (value.stations && value.stations.length !== 0) {
        const list = [];
        for (const i in value.stations) {
            if (value.stations[i]) {
                list.push(value.stations[i].name);
            }
        }
        return list;
    }
    return null;
  }

  displayEngine(value: any) {
    if (this.state.idsEngine && this.state.idsEngine.length !== 0) {
        const list = [];
        for (const i in this.state.idsEngine) {
            if (this.state.idsEngine[i]) {
                list.push(this.state.idsEngine[i].number);
            }
        }
        return list;
    }
    if (value.engines && value.engines.length !== 0) {
        const list = [];
        for (const i in value.engines) {
            if (value.engines[i]) {
                list.push(value.engines[i].number);
            }
        }
        return list;
    }
    return null;
  }

  displayChangelog(value: any) {
    if (this.state.idsChangelog && this.state.idsChangelog.length !== 0) {
        const list = [];
        for (const i in this.state.idsChangelog) {
            if (this.state.idsChangelog[i]) {
                list.push(this.state.idsChangelog[i].id);
            }
        }
        return list;
    }
    if (value.changelogs && value.changelogs.length !== 0) {
        const list = [];
        for (const i in value.changelogs) {
            if (value.changelogs[i]) {
                list.push(value.changelogs[i].id);
            }
        }
        return list;
    }
    return null;
  }

  render() {
    const isInvalid = false;
    const { article, attachments, tags, stations, engines, changelogs, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <Modal isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose} size="lg">
      <ModalHeader toggle={this.handleClose}>
        <Translate contentKey="dhsKnowledgeManagementApp.article.home.createOrEditLabel">Create or edit a Article</Translate>
      </ModalHeader>
      { loading ? <p>Loading...</p>
      : <AvForm model={isNew ? {} : article} onSubmit={this.saveEntity} >
          <ModalBody>
            { article.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label id="titleLabel" for="title">
                <Translate contentKey="dhsKnowledgeManagementApp.article.title">
                  title
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="title" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label id="detailLabel" for="detail">
                <Translate contentKey="dhsKnowledgeManagementApp.article.detail">
                  detail
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="detail" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label id="previewLabel" for="preview">
                <Translate contentKey="dhsKnowledgeManagementApp.article.preview">
                  preview
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="preview" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label id="statusLabel">
                <Translate contentKey="dhsKnowledgeManagementApp.article.status">
                  status
                </Translate>
              </Label>
              <AvInput type="select"
                className="form-control"
                name="status"
              >
                <option value="DRAFT">
                    DRAFT
                </option>
                <option value="APPROVED">
                    APPROVED
                </option>
              </AvInput>
            </AvGroup>
            <AvGroup>
              <Label for="attachments"><Translate contentKey="dhsKnowledgeManagementApp.article.attachment">Attachment</Translate></Label>
              <AvInput type="select"
                multiple
                className="form-control"
                name="fakeattachments"
                value={this.displayAttachment(article)}
                onChange={this.attachmentUpdate}>
                <option value="" key="0" />
                {
                  (attachments) ? (attachments.map(otherEntity =>
                  <option
                      value={otherEntity.name}
                      key={otherEntity.id}>
                      {otherEntity.name}
                  </option>
                  )) : null
                }
              </AvInput>
              <AvInput type="hidden"
                name="attachments"
                value={this.state.idsAttachment}
              />
            </AvGroup>
            <AvGroup>
              <Label for="tags"><Translate contentKey="dhsKnowledgeManagementApp.article.tag">Tag</Translate></Label>
              <AvInput type="select"
                multiple
                className="form-control"
                name="faketags"
                value={this.displayTag(article)}
                onChange={this.tagUpdate}>
                <option value="" key="0" />
                {
                  (tags) ? (tags.map(otherEntity =>
                  <option
                      value={otherEntity.name}
                      key={otherEntity.id}>
                      {otherEntity.name}
                  </option>
                  )) : null
                }
              </AvInput>
              <AvInput type="hidden"
                name="tags"
                value={this.state.idsTag}
              />
            </AvGroup>
            <AvGroup>
              <Label for="stations"><Translate contentKey="dhsKnowledgeManagementApp.article.station">Station</Translate></Label>
              <AvInput type="select"
                multiple
                className="form-control"
                name="fakestations"
                value={this.displayStation(article)}
                onChange={this.stationUpdate}>
                <option value="" key="0" />
                {
                  (stations) ? (stations.map(otherEntity =>
                  <option
                      value={otherEntity.name}
                      key={otherEntity.id}>
                      {otherEntity.name}
                  </option>
                  )) : null
                }
              </AvInput>
              <AvInput type="hidden"
                name="stations"
                value={this.state.idsStation}
              />
            </AvGroup>
            <AvGroup>
              <Label for="engines"><Translate contentKey="dhsKnowledgeManagementApp.article.engine">Engine</Translate></Label>
              <AvInput type="select"
                multiple
                className="form-control"
                name="fakeengines"
                value={this.displayEngine(article)}
                onChange={this.engineUpdate}>
                <option value="" key="0" />
                {
                  (engines) ? (engines.map(otherEntity =>
                  <option
                      value={otherEntity.number}
                      key={otherEntity.id}>
                      {otherEntity.number}
                  </option>
                  )) : null
                }
              </AvInput>
              <AvInput type="hidden"
                name="engines"
                value={this.state.idsEngine}
              />
            </AvGroup>
            <AvGroup>
              <Label for="changelogs"><Translate contentKey="dhsKnowledgeManagementApp.article.changelog">Changelog</Translate></Label>
              <AvInput type="select"
                multiple
                className="form-control"
                name="fakechangelogs"
                value={this.displayChangelog(article)}
                onChange={this.changelogUpdate}>
                <option value="" key="0" />
                {
                  (changelogs) ? (changelogs.map(otherEntity =>
                  <option
                      value={otherEntity.id}
                      key={otherEntity.id}>
                      {otherEntity.id}
                  </option>
                  )) : null
                }
              </AvInput>
              <AvInput type="hidden"
                name="changelogs"
                value={this.state.idsChangelog}
              />
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
  article: storeState.article.entity,
  attachments: storeState.article.attachments,
  tags: storeState.article.tags,
  stations: storeState.article.stations,
  engines: storeState.article.engines,
  changelogs: storeState.article.changelogs,
  loading: storeState.article.loading,
  updating: storeState.article.updating
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDialog);
