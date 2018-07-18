import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import { last } from 'lodash';
import config from '../config';

export const client = axios.create({
  baseURL: config.API_URL,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const axiosApiMiddleware = axiosMiddleware(client);

export const getActionTypes = (
  action,
  { errorSuffix = '_FAIL', successSuffix = '_SUCCESS' } = {}
) => {
  let types;
  if (typeof action.type !== 'undefined') {
    const { type } = action;
    types = [type, `${type}${successSuffix}`, `${type}${errorSuffix}`];
  } else if (typeof action.types !== 'undefined') {
    const { types: _types } = action;
    types = _types;
  } else {
    throw new Error('Action needs to have "type" or "types" key which is not null');
  }
  return types;
};

export const getErrorActionType = (action, options) => last(getActionTypes(action, options));
