const webpack = require("webpack");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require("./base.config.js");

const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(baseConfig, {
    // mark us as in production mode
    mode: "production",

    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new CompressionPlugin()
    ],

    // don't hot reload for production since things won't get saved
    watch: false,

    // minimize JS
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            })
        ]
    }
});
