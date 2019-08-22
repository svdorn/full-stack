"use strict";
import React from "react";

//REACT_ROUTER
import { Router, Route, IndexRoute, browserHistory, Redirect } from "react-router";

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Main} />
    </Router>
);

export default routes;
