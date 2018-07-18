import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import * as reducers from '../../reducers';
import { axiosApiMiddleware } from '../../services/axios';
import history from '../../services/history';

import AppView from '../AppView';
import LoginView from '../LoginView';
import AppInfo from '../../components/AppInfo';
import Callback from '../Callback';

const historyMiddleware = routerMiddleware(history);
const middlewares = [thunk, historyMiddleware, axiosApiMiddleware];

const createStoreWithMiddleware = applyMiddleware.apply(this, middlewares)(createStore);
const reducer = combineReducers({ ...reducers, routing: routerReducer });
const store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-ignore-line
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/app-info" component={AppInfo} />
            <Route exact path="/callback" component={Callback} />
            <Route path="/" component={AppView} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
