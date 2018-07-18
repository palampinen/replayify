/* eslint-disable import/prefer-default-export */
import localStorage from 'local-storage';
import { get } from 'lodash';
import { getErrorActionType } from '../services/axios';
import history from '../services/history';

const getAccessToken = () => localStorage.get('accessToken');

const getAuthHeader = token => {
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
};

const isUnauthorized = status => status === 401;
const redirectToLogin = () => history.replace('/login');

// https://github.com/svrcekmichal/redux-axios-middleware#middleware-options
const handleApiError = response => {
  const status = get(response, 'error.response.status');
  const { error, action, next, options } = response;

  // On Unauthorized Request redirect to /login
  if (isUnauthorized(status)) {
    return redirectToLogin();
  }

  const errorObject = {
    text: get(error, 'response.statusText', error.message),
    code: get(error, 'response.status'),
  };

  const nextAction = {
    type: getErrorActionType(action, options),
    error: errorObject,
    payload: get(action, 'payload'),
  };

  next(nextAction);
  return nextAction;
};

export const apiCall = ({
  endpoint,
  type,
  types,
  payload,
  method = 'GET',
  ...opts
}) => dispatch => {
  // Get access token from state
  const token = getAccessToken();
  const authHeader = getAuthHeader(token);

  return dispatch({
    type,
    types,
    payload: {
      ...payload,
      request: {
        url: endpoint,
        method,
        headers: {
          ...authHeader,
        },
        ...opts,
      },
      options: {
        onError: handleApiError,
      },
    },
  });
};
