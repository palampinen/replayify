// react-router-redux
import { get } from 'lodash';

export const getCurrentPathName = state => get(state, ['routing', 'location', 'pathname']);
