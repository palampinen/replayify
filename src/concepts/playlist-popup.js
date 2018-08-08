// # Popup concept
import { fromJS } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { isNil } from 'lodash';

// # Action Types
const OPEN_PLAYLIST_POPUP = 'playlistPopup/OPEN_PLAYLIST_POPUP';
const CLOSE_PLAYLIST_POPUP = 'playlistPopup/CLOSE_PLAYLIST_POPUP';
const SET_PLAYLIST_IMAGES = 'playlistPopup/SET_PLAYLIST_IMAGES';

// # Selectors
export const getPlaylistPopupUri = state => state.playlistPopup.get('uri');
export const getPlaylistPopupVisibility = createSelector(getPlaylistPopupUri, uri => !isNil(uri));

export const getPlaylistImages = state => state.playlistPopup.get('playlistImages');
export const getPlaylistImage = createSelector(getPlaylistImages, imageList => {
  if (!imageList || imageList.size === 0) {
    return null;
  }

  // prefer image at index 1 which is 300px, fallback to first image which is 640px
  return imageList.getIn([1, 'url']) || imageList.getIn([0, 'url']);
});

export const getPopupData = createStructuredSelector({
  playlistUri: getPlaylistPopupUri,
  playlistImage: getPlaylistImage,
  isVisible: getPlaylistPopupVisibility,
});

// # Action Creators
export const openPlaylistPopup = uri => ({ type: OPEN_PLAYLIST_POPUP, payload: uri });
export const closePlaylistPopup = () => ({ type: CLOSE_PLAYLIST_POPUP });
export const setPlaylistImages = imageList => ({ type: SET_PLAYLIST_IMAGES, payload: imageList });

// # Reducer
const initialState = fromJS({
  uri: null,
  playlistImages: [],
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_PLAYLIST_POPUP: {
      return state.set('uri', action.payload);
    }

    case CLOSE_PLAYLIST_POPUP: {
      return state.set('uri', null).set('playlistImages', fromJS([]));
    }

    case SET_PLAYLIST_IMAGES: {
      return state.set('playlistImages', fromJS(action.payload));
    }

    default: {
      return state;
    }
  }
}
