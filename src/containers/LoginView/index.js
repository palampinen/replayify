import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { authorizeUser } from '../../concepts/auth';
import changeThemeColor from '../../services/change-theme';
import ThemeColors from '../../constants/ThemeColors';
import './LoginView.css';

const appIcon = require('../../assets/images/replayify-icon--green.png');

class LoginView extends Component {
  componentDidMount() {
    changeThemeColor(ThemeColors.DEFAULT);
  }

  render() {
    return (
      <span>
        <div className="login">
          <span className="login__app-icon" onClick={this.toggleAppInfo}>
            <img src={appIcon} alt="Replayify" />
          </span>
          <div className="login__content">
            <h1 className="login__title">Replay your Spotify Hits</h1>
            <button className="btn btn-primary btn-login" onClick={this.props.authorizeUser}>
              Sign in with Spotify
            </button>

            <Link className="btn-link" to="app-info">
              What is this?
            </Link>
          </div>
          <span className="login__background" />
        </div>
      </span>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = { authorizeUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
