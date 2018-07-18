import React from 'react';
import classnames from 'classnames';

import { options, labels } from '../../constants/TimeRanges';
import './TimeRangeSelector.css';

export default ({ selected, onSelect }) => (
  <div className="time-range-selector">
    {options.map(option => (
      <button
        onClick={() => onSelect(option)}
        className={classnames('time-option', { 'time--active': option === selected })}
      >
        {labels[option]}
      </button>
    ))}
  </div>
);
