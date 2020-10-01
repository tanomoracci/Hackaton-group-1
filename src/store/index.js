/*
 *
 * Redux Store
 *
 */

import { applyMiddleware, combineReducers, compose as ReduxCompose, createStore } from "redux";
import { reducer } from "@andyet/simplewebrtc";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware, connectRouter } from "connected-react-router";
import Thunk from "redux-thunk";

export const history = createHistory();
const routingMiddleware = routerMiddleware(history);
const middleware = [Thunk, routingMiddleware];

// redux devtools
const compose = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || ReduxCompose;
const store = createStore(
  combineReducers({
      simplewebrtc: reducer,
      router: connectRouter(history),
  }),
  { simplewebrtc: {} },
  compose(applyMiddleware(...middleware)),
);
export default store;
