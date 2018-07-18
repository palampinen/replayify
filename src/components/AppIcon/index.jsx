import React from 'react';
import classnames from 'classnames';

import './AppIcon.css';
const appIcon = require('../../assets/images/replayify-icon.png');

const AppIcon = ({ theme }) => (
  <span className={classnames('appicon', `appicon--${theme}`)}>
    <img src={appIcon} alt="Replayify" />
  </span>
);

AppIcon.defaultProps = {
  theme: 'default',
};

export default AppIcon;
