import React, { Component } from 'react';
import classnames from 'classnames';

import './ListActionPanel.css';

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
    const { title, description, onActionClick } = this.props;
    const { isOnTop } = this.state;

    return (
      <div className={classnames('action-buttons', { 'action-buttons--scrolled': !isOnTop })}>
        <div className="action-buttons__info">
          <div className="action-buttons__title">{title}</div>
          {description}
        </div>
        <div className="action-buttons__button">
          <button className="btn btn-dark" onClick={onActionClick}>
            Create Playlist
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
