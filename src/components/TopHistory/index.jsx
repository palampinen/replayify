import React from 'react';

import ListPage from '../ListPage';
import TopHistoryTrack from '../TopHistoryTrack';
import TopHistoryArtist from '../TopHistoryArtist';
import TimeRangeSelector from '../TimeRangeSelector';
import ThemeColors from '../../constants/ThemeColors';
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
  type = 'artists',
}) => (
  <div className="top-history">
    {type === 'artists' && (
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
            <div className="action-buttons">
              <div className="action-buttons__title">Create Your Top Artists playlist</div>
              This creates a playlist from your Top-20 artists with Top-5 tracks from each artists
              in randomized order.
              <button className="btn btn-dark" onClick={createArtistPlaylist}>
                Create Playlist
              </button>
            </div>
          )}
        </div>
      </ListPage>
    )}
    {type === 'tracks' && (
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
            <div className="action-buttons">
              <div className="action-buttons__title">Create Your Top Tracks playlist</div>
              This creates a playlist from your Top-50 tracks.
              <button className="btn btn-dark" onClick={createTracksPlaylist}>
                &nbsp; Create Playlist
              </button>
            </div>
          )}
        </div>
      </ListPage>
    )}
  </div>
);

export default TopHistory;
