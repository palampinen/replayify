import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closePlaylistPopup, getPopupData } from '../../concepts/playlist-popup';
import Modal from '../../components/Modal';
import './PlaylistPopup.css';

class PlaylistPopup extends Component {
  render() {
    const { playlistUri, playlistImage, isVisible } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <Modal>
        <div className="playlist-popup">
          <h3 className="playlist-popup__title">Yeah!</h3>
          <p className="playlist-popup__info">Your new Playlist is now available in Spotify.</p>
          <div className="save-form-success">
            {!!playlistImage && (
              <a
                href={playlistUri}
                className="playlist-popup__image-link"
                title="Open Playlist in Spotify"
              >
                <img src={playlistImage} alt="Playlist cover" className="playlist-popup__image" />
              </a>
            )}
            <div className="ok-sign">
              <svg className="progress" width="150" height="150" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <circle className="circle_base" r="72" cy="75" cx="75" fill="none" />
                  <circle className="circle_animation" r="72" cy="75" cx="75" fill="none" />
                </g>
              </svg>

              <i className="icon ion-android-done" />
            </div>
          </div>

          <div className="playlist__buttons">
            <a
              className="btn btn-inline btn-dark"
              href={playlistUri}
              onClick={this.props.closePlaylistPopup}
            >
              Open Playlist
            </a>
            <button onClick={this.props.closePlaylistPopup} className="btn btn-inline btn-default">
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = getPopupData;
const mapDispatchToProps = {
  closePlaylistPopup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistPopup);
