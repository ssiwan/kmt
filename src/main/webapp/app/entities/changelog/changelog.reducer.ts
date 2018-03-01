import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from '../../reducers/action-type.util';
import { messages, SERVER_API_URL } from '../../config/constants';

// import { JhiDateUtils } from 'ng-jhipster';
// import { Changelog } from './changelog.model';

export const ACTION_TYPES = {
  FETCH_CHANGELOGS: 'changelog/FETCH_CHANGELOGS',
  FETCH_users: 'users/FETCH_users',
  FETCH_articles: 'articles/FETCH_articles',
  FETCH_CHANGELOG:  'changelog/FETCH_CHANGELOG',
  CREATE_CHANGELOG: 'changelog/CREATE_CHANGELOG',
  UPDATE_CHANGELOG: 'changelog/UPDATE_CHANGELOG',
  DELETE_CHANGELOG: 'changelog/DELETE_CHANGELOG'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  users: [],
  articles: [],
  updating: false,
  updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_users):
    case REQUEST(ACTION_TYPES.FETCH_articles):
    case REQUEST(ACTION_TYPES.FETCH_CHANGELOGS):
    case REQUEST(ACTION_TYPES.FETCH_CHANGELOG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHANGELOG):
    case REQUEST(ACTION_TYPES.UPDATE_CHANGELOG):
    case REQUEST(ACTION_TYPES.DELETE_CHANGELOG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_users):
    case FAILURE(ACTION_TYPES.FETCH_articles):
    case FAILURE(ACTION_TYPES.FETCH_CHANGELOGS):
    case FAILURE(ACTION_TYPES.FETCH_CHANGELOG):
    case FAILURE(ACTION_TYPES.CREATE_CHANGELOG):
    case FAILURE(ACTION_TYPES.UPDATE_CHANGELOG):
    case FAILURE(ACTION_TYPES.DELETE_CHANGELOG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_users):
      return {
        ...state,
        loading: false,
        users: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_articles):
      return {
        ...state,
        loading: false,
        articles: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHANGELOGS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHANGELOG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHANGELOG):
    case SUCCESS(ACTION_TYPES.UPDATE_CHANGELOG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHANGELOG):
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

const apiUrl = SERVER_API_URL + '/api/changelogs';

// Actions

export const getusers: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_users,
  payload: axios.get(`/api/users?cacheBuster=${new Date().getTime()}`)
});

export const getarticles: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_articles,
  payload: axios.get(`/api/articles?cacheBuster=${new Date().getTime()}`)
});

export const getEntities: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHANGELOGS,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHANGELOG,
    payload: axios.get(requestUrl)
  };
};

export const createEntity: ICrudPutAction = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHANGELOG,
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
    type: ACTION_TYPES.UPDATE_CHANGELOG,
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
    type: ACTION_TYPES.DELETE_CHANGELOG,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};
