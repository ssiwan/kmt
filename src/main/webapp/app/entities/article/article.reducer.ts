import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from '../../reducers/action-type.util';
import { messages, SERVER_API_URL } from '../../config/constants';

// import { Article } from './article.model';

export const ACTION_TYPES = {
  FETCH_ARTICLES: 'article/FETCH_ARTICLES',
  FETCH_attachments: 'attachments/FETCH_attachments',
  FETCH_tags: 'tags/FETCH_tags',
  FETCH_stations: 'stations/FETCH_stations',
  FETCH_engines: 'engines/FETCH_engines',
  FETCH_changelogs: 'changelogs/FETCH_changelogs',
  FETCH_ARTICLE:  'article/FETCH_ARTICLE',
  CREATE_ARTICLE: 'article/CREATE_ARTICLE',
  UPDATE_ARTICLE: 'article/UPDATE_ARTICLE',
  DELETE_ARTICLE: 'article/DELETE_ARTICLE'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  attachments: [],
  tags: [],
  stations: [],
  engines: [],
  changelogs: [],
  updating: false,
  updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_attachments):
    case REQUEST(ACTION_TYPES.FETCH_tags):
    case REQUEST(ACTION_TYPES.FETCH_stations):
    case REQUEST(ACTION_TYPES.FETCH_engines):
    case REQUEST(ACTION_TYPES.FETCH_changelogs):
    case REQUEST(ACTION_TYPES.FETCH_ARTICLES):
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ARTICLE):
    case REQUEST(ACTION_TYPES.UPDATE_ARTICLE):
    case REQUEST(ACTION_TYPES.DELETE_ARTICLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_attachments):
    case FAILURE(ACTION_TYPES.FETCH_tags):
    case FAILURE(ACTION_TYPES.FETCH_stations):
    case FAILURE(ACTION_TYPES.FETCH_engines):
    case FAILURE(ACTION_TYPES.FETCH_changelogs):
    case FAILURE(ACTION_TYPES.FETCH_ARTICLES):
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE):
    case FAILURE(ACTION_TYPES.CREATE_ARTICLE):
    case FAILURE(ACTION_TYPES.UPDATE_ARTICLE):
    case FAILURE(ACTION_TYPES.DELETE_ARTICLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_attachments):
      return {
        ...state,
        loading: false,
        attachments: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_tags):
      return {
        ...state,
        loading: false,
        tags: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_stations):
      return {
        ...state,
        loading: false,
        stations: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_engines):
      return {
        ...state,
        loading: false,
        engines: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_changelogs):
      return {
        ...state,
        loading: false,
        changelogs: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ARTICLE):
    case SUCCESS(ACTION_TYPES.UPDATE_ARTICLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ARTICLE):
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

const apiUrl = SERVER_API_URL + '/api/articles';

// Actions

export const getattachments: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_attachments,
  payload: axios.get(`/api/attachments?cacheBuster=${new Date().getTime()}`)
});

export const gettags: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_tags,
  payload: axios.get(`/api/tags?cacheBuster=${new Date().getTime()}`)
});

export const getstations: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_stations,
  payload: axios.get(`/api/stations?cacheBuster=${new Date().getTime()}`)
});

export const getengines: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_engines,
  payload: axios.get(`/api/engines?cacheBuster=${new Date().getTime()}`)
});

export const getchangelogs: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_changelogs,
  payload: axios.get(`/api/changelogs?cacheBuster=${new Date().getTime()}`)
});

export const getEntities: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ARTICLES,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE,
    payload: axios.get(requestUrl)
  };
};

export const createEntity: ICrudPutAction = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ARTICLE,
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
    type: ACTION_TYPES.UPDATE_ARTICLE,
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
    type: ACTION_TYPES.DELETE_ARTICLE,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};
