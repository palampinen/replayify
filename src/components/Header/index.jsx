import React, { Component } from 'react';
import classnames from 'classnames';
import AppIcon from '../AppIcon';

import './Header.css';

const scrollTarget = window;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isOnTop: true };
    this.scrollWatcher = this.scrollWatcher.bind(this);
  }

  componentDidMount() {
    scrollTarget.addEventListener('scroll', this.scrollWatcher);
  }

  componentWillUnmount() {
    scrollTarget.removeEventListener('scroll', this.scrollWatcher);
  }

  scrollWatcher() {
    const { isOnTop } = this.state;
    const scrollPosition = scrollTarget.pageYOffset || 0;

    if (isOnTop && scrollPosition > 0) {
      this.setState({ isOnTop: false });
    } else if (!isOnTop && scrollPosition === 0) {
      this.setState({ isOnTop: true });
    }
  }

  render() {
    const { user } = this.props;
    const { isOnTop } = this.state;

    return (
      <header className={classnames('header', { 'header--scrolled': !isOnTop })}>
        <div className="container">
          {/*<AppIcon theme="white" />*/}
          <div />

          <div className="header__user">
            <span className="header__avatar">
              <span className="header__avatar__fallback ion-android-person" />
            </span>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
