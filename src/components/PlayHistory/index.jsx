import React, { Component } from 'react';

import ListPage from '../ListPage';
import PlayHistoryItem from '../PlayHistoryItem';
import ListActionPanel from '../ListActionPanel';
import ThemeColors from '../../constants/ThemeColors';
import './PlayHistory.css';

const showMax = 50;
const playImg = require('../../assets/images/recently.jpg');

class PlayHistory extends Component {
  componentDidMount() {
    this.props.updatePlayHistory();
  }

  render() {
    const { plays, downloadImage, createRecentlyPlaylist } = this.props;
    return (
      <div className="play-history">
        <ListPage
          headerImageSrc={playImg}
          title="Recently Played"
          themeColor={ThemeColors.YELLOW}
          downloadImage={downloadImage}
        >
          <div>
            {plays
              .slice(0, showMax)
              .map(play => <PlayHistoryItem key={play.get('played_at')} play={play} />)}

            {plays.size > 0 && (
              <ListActionPanel
                title="Create Recently Played playlist"
                description="This creates a playlist from your 50 Recently Played tracks."
                onActionClick={createRecentlyPlaylist}
              />
            )}
          </div>
        </ListPage>
      </div>
    );
  }
}

export default PlayHistory;
