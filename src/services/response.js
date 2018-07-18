/* eslint-disable import/prefer-default-export */
import { get } from 'lodash';

export const getRequestTarget = action =>
  get(action, 'payload.config.reduxSourceAction.payload.target') || get(action, 'payload.target');
