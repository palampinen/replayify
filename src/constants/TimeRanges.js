const timeRanges = {
  LONG: 'long_term',
  MEDIUM: 'medium_term',
  SHORT: 'short_term',
};

export const options = [timeRanges.LONG, timeRanges.MEDIUM, timeRanges.SHORT];

export const labels = {
  [timeRanges.LONG]: 'All time',
  [timeRanges.MEDIUM]: 'Last 6 months',
  [timeRanges.SHORT]: 'Last month',
};

export default timeRanges;
