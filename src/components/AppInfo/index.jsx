import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import config from '../../config';

import Modal from '../Modal';
import AppIcon from '../AppIcon';
import './AppInfo.css';

class AppInfo extends Component {
  render() {
    const scopes = config.SPOTIFY_AUTH_SCOPES.split(' ');
    return (
      <Modal>
        <div className="app-info">
          <div className="app-info__logo">
            <AppIcon />
          </div>
          <h1>Replayify App</h1>
          <p>
            This is an Application to Discover your Spotify usage and creating playlist from your
            Top Artists and Tracks. It uses Spotify Web API.
          </p>
          <h3>Required Spotify access</h3>
          <p>
            Application requires access to your Spotify account. We use Spotify Implicit Grant Flow
            for user Authorization. Application works as client side only and your Spotify data is
            not stored to any server.
          </p>
          <h3>Used Scopes</h3>
          <p>
            Scopes enable the application to access specific Spotify API endpoints. The set of
            scopes that are required for you to access this Application:
            <ul className="scope-list">{scopes.map(scope => <li>{scope}</li>)}</ul>
          </p>

          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://developer.spotify.com/documentation/general/guides/authorization-guide/"
          >
            Read more about Spotify scopes
          </a>
          <div className="app-info__buttons">
            <Link className="btn btn-secondary" to="/login">
              OK, got it{' '}
              <span aria-label="OK" role="img">
                👌🏻
              </span>
            </Link>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AppInfo;
