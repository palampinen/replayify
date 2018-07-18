import React from 'react';
import ListItemCoverImage from '../ListItemCoverImage';

import './TopHistoryArtist.css';

const TopHistoryArtist = ({ artist, orderNumber }) => (
  <a className="artist-history__item" href={artist.get('uri')}>
    <span className="order-number">{orderNumber}</span>
    <span className="artist__info">
      <ListItemCoverImage src={artist.getIn(['images', 2, 'url'])} />
      <span className="artist__summary">
        <span className="artist__name">{artist.get('name')}</span>
        <span className="artist__genres">
          {artist
            .get('genres')
            .slice(0, 3)
            .join(', ')}
        </span>
      </span>
    </span>
  </a>
);

export default TopHistoryArtist;
