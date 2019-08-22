const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
    // devtool: 'eval-source-map',

    mode: "development",

    plugins: [
        /*new BundleAnalyzerPlugin()*/
    ]
});
