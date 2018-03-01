import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from '../../reducers/action-type.util';
import { messages, SERVER_API_URL } from '../../config/constants';

// import { Attachment } from './attachment.model';

export const ACTION_TYPES = {
  FETCH_ATTACHMENTS: 'attachment/FETCH_ATTACHMENTS',
  FETCH_articles: 'articles/FETCH_articles',
  FETCH_ATTACHMENT:  'attachment/FETCH_ATTACHMENT',
  CREATE_ATTACHMENT: 'attachment/CREATE_ATTACHMENT',
  UPDATE_ATTACHMENT: 'attachment/UPDATE_ATTACHMENT',
  DELETE_ATTACHMENT: 'attachment/DELETE_ATTACHMENT'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  articles: [],
  updating: false,
  updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_articles):
    case REQUEST(ACTION_TYPES.FETCH_ATTACHMENTS):
    case REQUEST(ACTION_TYPES.FETCH_ATTACHMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATTACHMENT):
    case REQUEST(ACTION_TYPES.UPDATE_ATTACHMENT):
    case REQUEST(ACTION_TYPES.DELETE_ATTACHMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_articles):
    case FAILURE(ACTION_TYPES.FETCH_ATTACHMENTS):
    case FAILURE(ACTION_TYPES.FETCH_ATTACHMENT):
    case FAILURE(ACTION_TYPES.CREATE_ATTACHMENT):
    case FAILURE(ACTION_TYPES.UPDATE_ATTACHMENT):
    case FAILURE(ACTION_TYPES.DELETE_ATTACHMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_articles):
      return {
        ...state,
        loading: false,
        articles: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATTACHMENTS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATTACHMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATTACHMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_ATTACHMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATTACHMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/attachments';

// Actions

export const getarticles: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_articles,
  payload: axios.get(`/api/articles?cacheBuster=${new Date().getTime()}`)
});

export const getEntities: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ATTACHMENTS,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATTACHMENT,
    payload: axios.get(requestUrl)
  };
};

export const createEntity: ICrudPutAction = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATTACHMENT,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.post(apiUrl, entity)
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATTACHMENT,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.put(apiUrl, entity)
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATTACHMENT,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};
