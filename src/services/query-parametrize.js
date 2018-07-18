import { isObject, isEmpty } from 'lodash';

const queryParametrize = (url, query) => {
  let queryParametrizedUrl = url;

  if (isObject(query) && !isEmpty(query)) {
    queryParametrizedUrl +=
      '?' +
      Object.keys(query)
        .map(k => {
          return encodeURIComponent(k) + '=' + encodeURIComponent(query[k]);
        })
        .join('&');
  }

  return queryParametrizedUrl;
};

export default queryParametrize;
