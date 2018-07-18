import React from 'react';
import moment from 'moment';
import ListItemCoverImage from '../ListItemCoverImage';

import './PlayHistoryItem.css';

const formatPlayTime = timestamp => {
  const today = moment();
  const playTime = moment(timestamp);

  const isPlayedToday = today.isSame(playTime, 'day');
  const isPlayedThisWeek = today.isSame(playTime, 'week');
  const isPlayedThisYear = today.isSame(playTime, 'year');

  let format = 'ddd DD.MM.YYYY HH.mm';

  if (isPlayedToday) {
    format = 'HH:mm';
  } else if (isPlayedThisWeek) {
    format = 'ddd HH:mm';
  } else if (isPlayedThisYear) {
    format = 'ddd DD.MM. HH:mm';
  }

  return playTime.format(format);
};

const PlayHistoryItem = ({ play }) => (
  <a className="play-history__item" href={play.getIn(['track', 'uri'])}>
    <span className="play__info">
      <ListItemCoverImage src={play.getIn(['track', 'album', 'images', 2, 'url'])} />

      <span className="play__summary">
        <span className="play__artist">{play.getIn(['track', 'artists', 0, 'name'])}</span>
        <span className="play__separator">●</span>
        <span className="play__track-name">{play.getIn(['track', 'name'])}</span>
      </span>
    </span>
    <span className="play__time">{formatPlayTime(play.getIn(['played_at']))}</span>
  </a>
);

export default PlayHistoryItem;
