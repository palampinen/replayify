// # Playlist concept

import { fromJS } from 'immutable';
import moment from 'moment';
import { get, isNil, flatten, shuffle } from 'lodash';

import { getUser } from './user';
import { fetchTopArtistsTopTracks, getTopTracksUris } from './top-history';
import { getRecentlyPlayedUris } from './play-history';
import { apiCall } from '../services/api';

// # Action Types
const CREATE_PLAYLIST = 'playlist/CREATE_PLAYLIST';
const CREATE_PLAYLIST_SUCCESS = 'playlist/CREATE_PLAYLIST_SUCCESS';

const ADD_TRACKS_TO_PLAYLIST = 'playlist/ADD_TRACKS_TO_PLAYLIST';

// # Selectors
export const getCreatingPlayListStatus = state => state.playList.get('isCreatingPlaylist');

// # Action Creators
export const createPlaylist = (params = {}) => (dispatch, getState) => {
  const user = getUser(getState());
  const userId = user.get('id');

  if (!userId) {
    return null;
  }

  return dispatch(
    apiCall({
      type: CREATE_PLAYLIST,
      url: `/users/${userId}/playlists`,
      method: 'POST',
      data: params,
    })
  );
};

export const addTracksToPlayList = (playlistId, tracks) => (dispatch, getState) => {
  const user = getUser(getState());
  const userId = user.get('id');

  if (!userId) {
    return null;
  }

  return dispatch(
    apiCall({
      type: ADD_TRACKS_TO_PLAYLIST,
      url: `users/${userId}/playlists/${playlistId}/tracks`,
      method: 'POST',
      data: { uris: tracks },
    })
  );
};

const topPerArtist = 5;
export const createTopArtistPlaylist = () => (dispatch, getState) => {
  let tracks;

  return dispatch(fetchTopArtistsTopTracks())
    .then(responses => {
      const tracksPerArtist = responses.map(response => get(response, 'payload.data.tracks'));

      const trackUris = tracksPerArtist.map(artistTracks =>
        artistTracks.slice(0, topPerArtist).map(track => get(track, 'uri'))
      );

      tracks = shuffle(flatten(trackUris));

      if (!tracks.length) {
        return Promise.reject(null);
      }
    })
    .then(() =>
      dispatch(
        createPlaylist({
          name: 'My Top-20 Artists',
          description: 'Top-5 tracks from each of my Top-20 artists.',
        })
      )
    )
    .then(response => {
      const playlist = get(response, 'payload.data');
      const playlistId = get(playlist, 'id');
      const playlistUri = get(playlist, 'uri');

      if (isNil(playlistId) || !tracks.length) {
        return null;
      }

      dispatch(addTracksToPlayList(playlistId, tracks)).then(
        () => (window.location.href = playlistUri)
      );
    });
};

export const createTopTracksPlaylist = () => (dispatch, getState) => {
  const tracks = getTopTracksUris(getState());

  if (!tracks.size) {
    return;
  }

  return dispatch(
    createPlaylist({
      name: 'My Top-50 Tracks',
    })
  ).then(response => {
    const playlist = get(response, 'payload.data');
    const playlistId = get(playlist, 'id');
    const playlistUri = get(playlist, 'uri');

    if (isNil(playlistId) || !tracks.size) {
      return null;
    }

    dispatch(addTracksToPlayList(playlistId, tracks.toJS())).then(
      () => (window.location.href = playlistUri)
    );
  });
};

export const createRecentlyPlayedPlaylist = () => (dispatch, getState) => {
  const tracks = getRecentlyPlayedUris(getState());

  console.log(tracks);

  if (!tracks.size) {
    return;
  }

  const today = moment();

  return dispatch(
    createPlaylist({
      name: `Last 50 Tracks - ${today.format('MMMM YYYY')}`,
    })
  ).then(response => {
    const playlist = get(response, 'payload.data');
    const playlistId = get(playlist, 'id');
    const playlistUri = get(playlist, 'uri');

    if (isNil(playlistId) || !tracks.size) {
      return null;
    }

    dispatch(addTracksToPlayList(playlistId, tracks.toJS())).then(
      () => (window.location.href = playlistUri)
    );
  });
};

// # Reducer

const initialState = fromJS({
  isCreatingPlaylist: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLAYLIST: {
      return state.set('isCreatingPlaylist', true);
    }
    case CREATE_PLAYLIST_SUCCESS: {
      return state.set('isCreatingPlaylist', false);
    }

    default: {
      return state;
    }
  }
}
