import React from 'react';

import ListPage from '../ListPage';
import TopHistoryTrack from '../TopHistoryTrack';
import TopHistoryArtist from '../TopHistoryArtist';
import TimeRangeSelector from '../TimeRangeSelector';
import ListActionPanel from '../ListActionPanel';
import ThemeColors from '../../constants/ThemeColors';
import { labels } from '../../constants/TimeRanges';
import PlaylistTypes from '../../constants/PlaylistTypes';
import './TopHistory.css';

const showMax = 50;
const artistImg = require('../../assets/images/top-artists.jpg');
const trackImg = require('../../assets/images/top-tracks.jpg');

const TopHistory = ({
  timeRange,
  topHistory,
  createArtistPlaylist,
  createTracksPlaylist,
  updateTimeRange,
  type = PlaylistTypes.ARTIST,
}) => (
  <div className="top-history">
    {type === PlaylistTypes.ARTIST && (
      <ListPage headerImageSrc={artistImg} title="Top Artists" themeColor={ThemeColors.PINK}>
        <div>
          <TimeRangeSelector selected={timeRange} onSelect={updateTimeRange} />

          {topHistory
            .get('artists')
            .slice(0, showMax)
            .map((artist, index) => (
              <TopHistoryArtist
                orderNumber={index + 1}
                key={`${timeRange}-${artist.get('id')}`}
                artist={artist}
              />
            ))}

          {topHistory.get('artists').size > 0 && (
            <ListActionPanel
              title="Create Your Top Artists playlist"
              description={`This creates a playlist from your ${
                labels[timeRange]
              } Top-20 artists with Top-5 tracks from each artist
                in random order.`}
              onActionClick={createArtistPlaylist}
            />
          )}
        </div>
      </ListPage>
    )}
    {type === PlaylistTypes.TRACK && (
      <ListPage headerImageSrc={trackImg} title="Top Tracks" themeColor={ThemeColors.BLUE}>
        <div>
          <TimeRangeSelector selected={timeRange} onSelect={updateTimeRange} />
          {topHistory
            .get('tracks')
            .slice(0, showMax)
            .map((track, index) => (
              <TopHistoryTrack
                orderNumber={index + 1}
                key={`${timeRange}-${track.get('id')}`}
                track={track}
              />
            ))}

          {topHistory.get('tracks').size > 0 && (
            <ListActionPanel
              title="Create Your Top Tracks playlist"
              description={`This creates a playlist from your ${labels[timeRange]} Top-50 tracks.`}
              onActionClick={createTracksPlaylist}
            />
          )}
        </div>
      </ListPage>
    )}
  </div>
);

export default TopHistory;
