// # Playlist name formatting based on playlist type and time range
import moment from 'moment';
import { get, isNil } from 'lodash';

import PlaylistTypes from '../constants/PlaylistTypes';
import { labels } from '../constants/TimeRanges';

const playlistDateFormat = 'MMMM YYYY';
const playlistPrefix = 'Replay';

const addTimeRange = label => {
  if (!isNil(label)) {
    return `• ${label} `;
  }

  return '';
};

export default ({ type, timeRange }) => {
  const dateNow = moment();
  const playlistDate = dateNow.format(playlistDateFormat);

  // # Recently Played
  if (type === PlaylistTypes.RECENT) {
    return `${playlistPrefix} 50 Tracks • ${playlistDate}`;
  }

  const timeRangeLabel = get(labels, timeRange);

  // # Top Artists
  if (type === PlaylistTypes.ARTIST) {
    return `${playlistPrefix} Top-20 Artists ${addTimeRange(timeRangeLabel)}• ${playlistDate}`;
  }

  // # Top Tracks
  if (type === PlaylistTypes.TRACK) {
    return `${playlistPrefix} Top-50 Tracks ${addTimeRange(timeRangeLabel)}• ${playlistDate}`;
  }

  return `${playlistPrefix} Playlist - ${playlistDate}`;
};
