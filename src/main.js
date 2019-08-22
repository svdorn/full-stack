"use strict";
import React from "react";
// so that axios works in IE < 11
require("es6-promise").polyfill();

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>Full Stack Template</div>;
    }
}

export default Main;
