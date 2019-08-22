"use strict";

const secure = location.protocol.toString() == "https:";
const hostname = location.hostname.toString();
const local = hostname == "localhost";

// if not on https and not on local, redirect to https
if (!secure && !local) {
    location.href = `https://${hostname}${location.pathname}`;
}

import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";

import { applyMiddleware, createStore } from "redux";
//import logger from 'redux-logger';
import thunk from "redux-thunk";

// import combined reducers
import reducers from "./reducers/index";

import routes from "./routes";

if (secure || local) {
    // STEP 1 create the store
    const middleware = applyMiddleware(thunk);
    // WE WILL PASS INITIAL STATE FROM SERVER STORE
    const initialState = window.INITIAL_STATE;
    const store = createStore(reducers, initialState, middleware);

    hydrate(<Provider store={store}>{routes}</Provider>, document.getElementById("app"));
}
