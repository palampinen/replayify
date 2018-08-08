// # Play history concept

import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { apiCall } from '../services/api';

// # Action Types
// const FETCH_RECENTLY_PLAYED = 'history/FETCH_RECENTLY_PLAYED';
// const FETCH_RECENTLY_PLAYED_SUCCESS = 'history/FETCH_RECENTLY_PLAYED_SUCCESS';
// const FETCH_RECENTLY_PLAYED_FAIL = 'history/FETCH_RECENTLY_PLAYED_FAIL';

const FETCH_PLAY_HISTORY = 'history/FETCH_PLAY_HISTORY';
const FETCH_PLAY_HISTORY_SUCCESS = 'history/FETCH_PLAY_HISTORY_SUCCESS';
// const FETCH_PLAY_HISTORY_FAIL = 'history/FETCH_PLAY_HISTORY_FAIL';

// # Selectors
export const getPlayHistory = state => state.playHistory.get('history');

export const getRecentlyPlayedUris = createSelector(getPlayHistory, tracks =>
  tracks.map(track => track.getIn(['track', 'uri']))
);

const getFirstImage = target => target.getIn(['track', 'album', 'images', 0, 'url']);
export const getPlayHistoryImages = createSelector(getPlayHistory, playHistory =>
  playHistory.map(getFirstImage)
);

// # Action Creators
export const fetchRecentlyPlayed = (params = {}) =>
  apiCall({
    type: FETCH_PLAY_HISTORY,
    url: '/me/player/recently-played',
    params: Object.assign({}, { limit: 50 }, params),
  });

export const fetchPlayHistory = () => dispatch => {
  return dispatch(fetchRecentlyPlayed());
};

// # Reducer

const initialState = fromJS({
  history: {},
  isLoadingHistory: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAY_HISTORY_SUCCESS: {
      return state.set('history', fromJS(action.payload.data.items));
    }

    default: {
      return state;
    }
  }
}
