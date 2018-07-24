import React, { Component } from 'react';
import './AppHelp.css';

class Apphelp extends Component {
  render() {
    return (
      <div>
        <div className="app-help">
          <h1>Replayify</h1>
          <p>
            With Replayify you can find your old Spotify gems. Some of the songs that you may have
            already forgotten. Perhaps an old crush that you played repeatedly during summer weeks
            before you had to move on.
          </p>
          <p>
            Refresh your memories and create Spotify playlists from your favorite Tracks and
            Artists.
          </p>
          <h3>Keep replayin' replayin' replayin'</h3>
          Disclaimer: Since this app encourages you to listen your old favorites, this will keep
          your music taste and listening habits static. Rememeber to listen also new music once in a
          while, so you'll find new favorites. And when you need a bit of nostalgia again, here you
          will find it!
          <h3>Spotify access</h3>
          <p>
            Application requires a Spotify account. It also needs access to your Spotify account.
            Application works as client side only and your Spotify data is not stored.
          </p>
          <h3>
            I logged in with wrong Spotify account <span role="img" arial-label="OMG" />
            😬
          </h3>
          <p>
            No worries, just go to{' '}
            <a href="http://accounts.spotify.com/" target="_blank" rel="noopener noreferrer">
              accounts.spotify.com
            </a>{' '}
            and press Log out -button. Then open{' '}
            <a href="http://replayify.com/login">replayify.com/login</a> and sign in with different
            account.
          </p>
          <div className="app-help__footer">
            <a
              className="footer__link footer__link--replayify"
              href="https://replayify.com"
              title="Replayify App"
            >
              <img src={require('../../assets/images/replayify-icon.png')} alt="Replayify" />
            </a>
            <a
              className="footer__link"
              href="https://github.com/palampinen/replayify"
              target="_blank"
              rel="noopener noreferrer"
              title="Replayify on Github"
            >
              <i className="ion-social-github" />
            </a>
            <a
              className="footer__link"
              href="https://spiceprogram.org/"
              target="_blank"
              rel="noopener noreferrer"
              title="Sponsored by Spice Program"
            >
              <img src={require('../../assets/images/chilicorn.png')} alt="Spice Program" />
            </a>
            <a
              className="footer__link"
              href="https://www.producthunt.com/posts/replayify"
              target="_blank"
              rel="noopener noreferrer"
              title="Replayify on Product Hunt"
            >
              <img
                className="img--ph"
                src={require('../../assets/images/product-hunt-logo.png')}
                alt="Product Hunt"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Apphelp;
