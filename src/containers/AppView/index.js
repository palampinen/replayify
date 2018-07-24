import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import {
  startAppView,
  createArtistPlaylist,
  createTracksPlaylist,
  createRecentlyPlaylist,
  getAppViewData,
  updateArtistsTimeRange,
  updateTracksTimeRange,
  updateRecentlyPlayed,
} from '../../concepts/app-view';
import PlaylistPopup from '../PlaylistPopup';
import PlayHistory from '../../components/PlayHistory';
import TopHistory from '../../components/TopHistory';
import ScrollTopRoute from '../../components/ScrollTopRoute';
import AppNavigation from '../../components/AppNavigation';
import AppHelp from '../../components/AppHelp';

import './AppView.css';

const artistImg = require('../../assets/images/top-artists.jpg');
const trackImg = require('../../assets/images/top-tracks.jpg');
const playImg = require('../../assets/images/recently.jpg');

const headerImgs = [artistImg, trackImg, playImg];

class AppView extends Component {
  componentDidMount() {
    this.props.startAppView();
  }

  render() {
    const {
      topHistory,
      playHistory,
      timeRange,
      updateArtistsTimeRange,
      updateTracksTimeRange,
      match,
    } = this.props;

    return (
      <div className="App">
        <div className="App-container">
          <AppNavigation />

          <PlaylistPopup />

          <div className="App-content">
            <Route exact path={`${match.url}`} render={() => <Redirect to="/top-artists" />} />
            <ScrollTopRoute
              exact
              path={`${match.url}top-artists`}
              render={() => (
                <TopHistory
                  timeRange={timeRange.get('artists')}
                  updateTimeRange={updateArtistsTimeRange}
                  topHistory={topHistory}
                  type="artists"
                  createArtistPlaylist={this.props.createArtistPlaylist}
                />
              )}
            />
            <ScrollTopRoute
              exact
              path={`${match.url}top-tracks`}
              render={() => (
                <TopHistory
                  timeRange={timeRange.get('tracks')}
                  updateTimeRange={updateTracksTimeRange}
                  topHistory={topHistory}
                  type="tracks"
                  createTracksPlaylist={this.props.createTracksPlaylist}
                />
              )}
            />
            <ScrollTopRoute
              exact
              path={`${match.url}recently-played`}
              render={() => (
                <PlayHistory
                  plays={playHistory}
                  createRecentlyPlaylist={this.props.createRecentlyPlaylist}
                  updatePlayHistory={this.props.updateRecentlyPlayed}
                />
              )}
            />
            <ScrollTopRoute exact path={`${match.url}app`} component={AppHelp} />
          </div>
        </div>

        <div className="preload-images">
          {headerImgs.map(src => <img key={src} alt="preloaded img" src={src} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = getAppViewData;
const mapDispatchToProps = {
  startAppView,
  createArtistPlaylist,
  createTracksPlaylist,
  createRecentlyPlaylist,
  updateArtistsTimeRange,
  updateTracksTimeRange,
  updateRecentlyPlayed,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView);
