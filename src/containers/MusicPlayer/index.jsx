import React, { Component } from 'react';
import { connect } from 'react-redux';

import './MusicPlayer.css';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = { isPlaying: false };
  }

  componentDidMount() {}

  togglePlayState = () => {
    const { isPlaying } = this.state;
    this.setState({ isPlaying: !isPlaying });

    if (isPlaying) {
      this.musicPlayer.pause();
    } else {
      this.musicPlayer.play();
    }
  };

  render() {
    return (
      <div className="music-player">
        <button className="play-button" onClick={this.togglePlayState}>
          <i className={this.state.isPlaying ? 'ion-pause' : 'ion-play'} />
        </button>

        <span className="music-player__info">
          <span className="music-player__info__track">On a good day (Metropolis)</span>
          <span className="music-player__info__artist">Above & Beyond</span>
        </span>

        <audio
          ref={input => {
            this.musicPlayer = input;
          }}
          loop
        >
          <source
            src="https://p.scdn.co/mp3-preview/b0eb767803a4d60afd9d804cd856e706f961caeb?cid=null"
            type="audio/mpeg"
          />
        </audio>

        <button className="close-player-button" onClick={this.props.onClose}>
          <i className="ion-android-close" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPlayer);
