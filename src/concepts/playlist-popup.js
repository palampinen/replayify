// # Popup concept
import { fromJS } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { isNil } from 'lodash';

// # Action Types
const OPEN_PLAYLIST_POPUP = 'playlistPopup/OPEN_PLAYLIST_POPUP';
const CLOSE_PLAYLIST_POPUP = 'playlistPopup/CLOSE_PLAYLIST_POPUP';

// # Selectors
export const getPlaylistPopupUri = state => state.playlistPopup.get('uri');
export const getPlaylistPopupVisibility = createSelector(getPlaylistPopupUri, uri => !isNil(uri));

export const getPopupData = createStructuredSelector({
  playlistUri: getPlaylistPopupUri,
  isVisible: getPlaylistPopupVisibility,
});

// # Action Creators
export const openPlaylistPopup = uri => ({ type: OPEN_PLAYLIST_POPUP, payload: uri });
export const closePlaylistPopup = () => ({ type: CLOSE_PLAYLIST_POPUP });

// # Reducer
const initialState = fromJS({
  uri: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_PLAYLIST_POPUP: {
      return state.set('uri', action.payload);
    }

    case CLOSE_PLAYLIST_POPUP: {
      return state.set('uri', null);
    }

    default: {
      return state;
    }
  }
}
