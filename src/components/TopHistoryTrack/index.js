import React from 'react';

import ListItemCoverImage from '../ListItemCoverImage';

import './TopHistoryTrack.css';

const TopHistoryTrack = ({ track, orderNumber }) => (
  <a className="track-history__item" href={track.getIn(['uri'])}>
    <span className="order-number">{orderNumber}</span>
    <span className="track__info">
      <ListItemCoverImage src={track.getIn(['album', 'images', 2, 'url'])} />

      <span className="track__summary">
        <span className="track__artist">{track.getIn(['artists', 0, 'name'])}</span>
        <span className="track__separator">●</span>
        <span className="track__track-name">{track.getIn(['name'])}</span>
      </span>
    </span>
  </a>
);

export default TopHistoryTrack;
