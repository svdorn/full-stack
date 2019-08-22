require("@babel/register")({
    presets: [["@babel/preset-env", { targets: "> 0.25%, not dead" }], "@babel/preset-react"],
    plugins: [
        // Stage 1
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-logical-assignment-operators",
        ["@babel/plugin-proposal-optional-chaining", { loose: false }],
        ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
        ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
        "@babel/plugin-proposal-do-expressions",

        // Stage 2
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions",

        // Stage 3
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        ["@babel/plugin-proposal-class-properties", { loose: false }],
        "@babel/plugin-proposal-json-strings"
    ]
});
// IF ANYTHING WITH CSS FILES IS EVER MESSED UP IT MAY BE BECAUSE OF THIS
// this fixes the problem of css files not being able to be imported into
// components directly
require.extensions[".css"] = () => {
    return;
};

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");

// PROXY
var httpProxy = require("http-proxy");
// REQUEST HANDLER FOR SERVER-SIDE RENDERING
var requestHandler = require("./requestHandler.js");

var app = express();

// PROXY TO API
const apiProxy = httpProxy.createProxyServer({
    target: "http://localhost:3001"
});
apiProxy.on("error", function(error) {
    console.log("Proxy error: ", error);
});
app.use("/api", function(req, res) {
    apiProxy.web(req, res);
});
// END PROXY

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(requestHandler);

app.use(function(req, res, next) {
    // catch 404 and forward to error handler
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
