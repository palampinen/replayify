// # App view concept

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
  dispatch(fetchPlayHistory());
  dispatch(fetchTopHistory());
};

export const updateTimeRange = type => timeRange => dispatch => {
  dispatch(setTimeRange(type)(timeRange));
  dispatch(fetchTop(type)());
};

export const updateArtistsTimeRange = updateTimeRange('artists');
export const updateTracksTimeRange = updateTimeRange('tracks');

export const createArtistPlaylist = createTopArtistPlaylist;
export const createTracksPlaylist = createTopTracksPlaylist;
export const createRecentlyPlaylist = createRecentlyPlayedPlaylist;
