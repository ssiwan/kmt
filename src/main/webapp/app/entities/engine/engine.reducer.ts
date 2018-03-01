import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from '../../reducers/action-type.util';
import { messages, SERVER_API_URL } from '../../config/constants';

// import { Engine } from './engine.model';

export const ACTION_TYPES = {
  FETCH_ENGINES: 'engine/FETCH_ENGINES',
  FETCH_articles: 'articles/FETCH_articles',
  FETCH_ENGINE:  'engine/FETCH_ENGINE',
  CREATE_ENGINE: 'engine/CREATE_ENGINE',
  UPDATE_ENGINE: 'engine/UPDATE_ENGINE',
  DELETE_ENGINE: 'engine/DELETE_ENGINE'
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
    case REQUEST(ACTION_TYPES.FETCH_ENGINES):
    case REQUEST(ACTION_TYPES.FETCH_ENGINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ENGINE):
    case REQUEST(ACTION_TYPES.UPDATE_ENGINE):
    case REQUEST(ACTION_TYPES.DELETE_ENGINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_articles):
    case FAILURE(ACTION_TYPES.FETCH_ENGINES):
    case FAILURE(ACTION_TYPES.FETCH_ENGINE):
    case FAILURE(ACTION_TYPES.CREATE_ENGINE):
    case FAILURE(ACTION_TYPES.UPDATE_ENGINE):
    case FAILURE(ACTION_TYPES.DELETE_ENGINE):
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
    case SUCCESS(ACTION_TYPES.FETCH_ENGINES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENGINE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ENGINE):
    case SUCCESS(ACTION_TYPES.UPDATE_ENGINE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ENGINE):
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

const apiUrl = SERVER_API_URL + '/api/engines';

// Actions

export const getarticles: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_articles,
  payload: axios.get(`/api/articles?cacheBuster=${new Date().getTime()}`)
});

export const getEntities: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ENGINES,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENGINE,
    payload: axios.get(requestUrl)
  };
};

export const createEntity: ICrudPutAction = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ENGINE,
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
    type: ACTION_TYPES.UPDATE_ENGINE,
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
    type: ACTION_TYPES.DELETE_ENGINE,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};
