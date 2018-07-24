import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './AppNavigation.css';

export default () => (
  <div className="App-navigation">
    <Link className="app-icon" to="/app">
      <img src={require('../../assets/images/replayify-icon.png')} alt="Replayify" />
    </Link>
    <NavLink activeClassName="active" className="App-navigation__link" to="/top-artists">
      <span className="icon ion-android-star-outline" />
      <span className="navigation__label">Top Artists</span>
    </NavLink>
    <NavLink activeClassName="active" className="App-navigation__link" to="/top-tracks">
      <span className="icon ion-android-favorite-outline" />
      <span className="navigation__label">Top Tracks</span>
    </NavLink>
    <NavLink activeClassName="active" className="App-navigation__link" to="/recently-played">
      <span className="icon ion-android-time" />
      <span className="navigation__label">Recent</span>
    </NavLink>
  </div>
);

