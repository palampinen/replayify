// # Play history concept

import { fromJS, Map } from 'immutable';
import { createSelector } from 'reselect';

import { apiCall } from '../services/api';
import { getRequestTarget } from '../services/response';
import config from '../config';
import TimeRanges from '../constants/TimeRanges';

// # Action Types
const FETCH_TOP_HISTORY = 'history/FETCH_TOP_HISTORY';
const FETCH_TOP_HISTORY_SUCCESS = 'history/FETCH_TOP_HISTORY_SUCCESS';
// const FETCH_TOP_HISTORY_FAIL = 'history/FETCH_TOP_HISTORY_FAIL';

const FETCH_ARTIST_TOP_TRACKS = 'history/FETCH_ARTIST_TOP_TRACKS';
const SET_TIME_RANGE = 'history/SET_TIME_RANGE';

// # Selectors
export const getTopArtists = state => state.topHistory.get('artists');
export const getTopTracks = state => state.topHistory.get('tracks');
export const getTimeRange = state => state.topHistory.get('timeRange');

export const getTopHistory = createSelector(getTopArtists, getTopTracks, (artists, tracks) =>
  fromJS({ artists, tracks })
);

export const getTopArtistsIds = createSelector(getTopArtists, artists =>
  artists.map(artist => artist.get('id'))
);

export const getTopTracksUris = createSelector(getTopTracks, tracks =>
  tracks.map(track => track.get('uri'))
);

// # Action Creators
export const fetchTop = type => (params = {}) => (dispatch, getState) => {
  const timeRanges = getTimeRange(getState());
  const timeRange = timeRanges.get(type);

  dispatch(
    apiCall({
      type: FETCH_TOP_HISTORY,
      url: `/me/top/${type}`,
      params: Object.assign({}, { limit: 50, time_range: timeRange }, params),
      payload: { target: type },
    })
  );
};

const fetchTopArtists = fetchTop('artists');
const fetchTopTracks = fetchTop('tracks');

export const fetchTopHistory = () => dispatch => {
  return Promise.all([dispatch(fetchTopArtists()), dispatch(fetchTopTracks())]);
};

export const fetchArtistTopTracks = artistId =>
  apiCall({
    type: FETCH_ARTIST_TOP_TRACKS,
    url: `/artists/${artistId}/top-tracks`,
    params: { country: config.DEFAULT_COUNTRY_CODE },
  });

export const fetchTopArtistsTopTracks = (count = 20) => (dispatch, getState) => {
  const artistIds = getTopArtistsIds(getState()).slice(0, count);

  if (artistIds.size === 0) {
    return null;
  }

  return Promise.all(artistIds.toJS().map(id => dispatch(fetchArtistTopTracks(id))));
};

export const setTimeRange = target => timeRange => ({
  type: SET_TIME_RANGE,
  payload: { target, timeRange },
});

export const setArtistsTimeRange = setTimeRange('artists');
export const setTracksTimeRange = setTimeRange('tracks');

// # Reducer
const initialState = fromJS({
  artists: {},
  tracks: {},
  timeRange: {
    artists: TimeRanges.LONG,
    tracks: TimeRanges.LONG,
  },
  isLoading: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_HISTORY: {
      // Clear on fetch
      const target = getRequestTarget(action);
      return state.set(target, Map());
    }

    case FETCH_TOP_HISTORY_SUCCESS: {
      const target = getRequestTarget(action);
      return state.set(target, fromJS(action.payload.data.items));
    }

    case SET_TIME_RANGE: {
      return state.setIn(['timeRange', action.payload.target], action.payload.timeRange);
    }

    default: {
      return state;
    }
  }
}
