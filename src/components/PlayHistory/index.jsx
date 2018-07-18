import React, { Component } from 'react';

import ListPage from '../ListPage';
import PlayHistoryItem from '../PlayHistoryItem';
import ThemeColors from '../../constants/ThemeColors';
import './PlayHistory.css';

const showMax = 50;
const playImg = require('../../assets/images/recently.jpg');

class PlayHistory extends Component {
  componentDidMount() {
    this.props.updatePlayHistory();
  }

  render() {
    const { plays, createRecentlyPlaylist } = this.props;
    return (
      <div className="play-history">
        <ListPage headerImageSrc={playImg} title="Recently Played" themeColor={ThemeColors.YELLOW}>
          <div>
            {plays
              .slice(0, showMax)
              .map(play => <PlayHistoryItem key={play.get('played_at')} play={play} />)}

            {plays.size > 0 && (
              <div className="action-buttons">
                <div className="action-buttons__title">Create Recently Played playlist</div>
                This creates a playlist from your 50 Recently Played tracks.
                <button className="btn btn-dark" onClick={createRecentlyPlaylist}>
                  Create Playlist
                </button>
              </div>
            )}
          </div>
        </ListPage>
      </div>
    );
  }
}

export default PlayHistory;
