// # App view concept
//
// This concept does not have reducer and it will work just as a combining
// "view-concept" for "core-concepts"

import { createStructuredSelector } from 'reselect';

import { checkLogin } from './auth';
import { fetchUserProfile, getUser } from './user';
import { fetchPlayHistory, getPlayHistory } from './play-history';
import {
  fetchTopHistory,
  fetchTop,
  getTopHistory,
  getTimeRange,
  setTimeRange,
} from './top-history';
import {
  createTopArtistPlaylist,
  createTopTracksPlaylist,
  createRecentlyPlayedPlaylist,
} from './playlist';

// # Selectors
export const getAppViewData = createStructuredSelector({
  user: getUser,
  playHistory: getPlayHistory,
  topHistory: getTopHistory,
  timeRange: getTimeRange,
});

// # Action creators
export const startAppView = () => dispatch => {
  console.log('Starting app view...');

  dispatch(checkLogin());

  dispatch(fetchUserProfile());
  // this fetch is somewhat redundant since app is updating play history
  // everytime playhistory is mounted. OTOH fetching this on start will
  // speed up first rendering of view
  dispatch(fetchPlayHistory());
  dispatch(fetchTopHistory());
};

export const updateRecentlyPlayed = fetchPlayHistory;
export const updateTimeRange = type => timeRange => dispatch => {
  dispatch(setTimeRange(type)(timeRange));
  dispatch(fetchTop(type)());
};

export const updateArtistsTimeRange = updateTimeRange('artists');
export const updateTracksTimeRange = updateTimeRange('tracks');

export const createArtistPlaylist = createTopArtistPlaylist;
export const createTracksPlaylist = createTopTracksPlaylist;
export const createRecentlyPlaylist = createRecentlyPlayedPlaylist;
