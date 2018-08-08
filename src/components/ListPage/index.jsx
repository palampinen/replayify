import React, { Component } from 'react';

import changeThemeColor from '../../services/change-theme';
import './ListPage.css';

class ListPage extends Component {
  componentDidMount() {
    const { themeColor } = this.props;
    if (themeColor) {
      changeThemeColor(themeColor);
    }
  }

  render() {
    const { headerImageSrc, title, downloadImage, children } = this.props;

    return (
      <div className="list-page">
        <div style={{ backgroundImage: `url(${headerImageSrc})` }} className="list-page__image" />
        <button onClick={downloadImage} className="share-link ion-android-share-alt" />
        <h1 className="list-page__title">{title}</h1>
        <div className="list-page__content">
          <div className="list-page__list">{children}</div>
        </div>
      </div>
    );
  }
}

export default ListPage;
