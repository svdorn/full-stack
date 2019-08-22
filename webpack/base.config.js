var path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let pathSections = __dirname.split("/");
pathSections.pop();
const homeDirectory = path.resolve(pathSections.join("/"));
const context = path.resolve(homeDirectory, "src");

module.exports = {
    // set default location for everything done in webpack to be /src
    context,
    // where everything starts
    entry: [
        // since webpack uses promises and iterators internally, polyfill promises and iterators
        "core-js/modules/es6.promise",
        "core-js/modules/es6.array.iterator",
        // polyfill old stuff (will make things like Array.prototype.includes work)
        "@babel/polyfill",
        // the entry point to the app
        "./client.js"
    ],
    module: {
        // what to do with different type of files
        rules: [
            {
                // search through every file in the src directory
                include: context,
                // select only the .css files
                test: /\.css$/,
                // used AFTER css-loader; takes the string generated from
                // css-loader and adds it to the DOM with a <script> tag
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
                        }
                    },
                    // remove the need for css prefixes (e.g. -webkit-)
                    { loader: "postcss-loader", options: { config: { path: "webpack/" } } }
                ]
            },
            {
                // search through every file in the src directory
                include: context,
                // find every js file
                test: /\.js$/,
                // make sure not to do this for node_modules because it could
                // screw them up
                exclude: [/node_modules/],
                // use babel to convert all new syntax to syntax that is widely
                // supported accross browsers
                loader: "babel-loader",
                query: {
                    // presets: ["react", "es2015", "stage-1"],
                    // plugins: ["transform-react-jsx", ["react-css-modules", { context }]]
                    presets: [
                        ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
                        "@babel/preset-react"
                    ],
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
                        "@babel/plugin-proposal-json-strings",

                        "transform-react-jsx",
                        ["react-css-modules", { context }]
                    ]
                }
            }
        ]
    },
    // once everything is bundled, put it in /public/bundle.js
    output: {
        filename: "bundle.js",
        path: path.resolve(homeDirectory, "./public")
    },
    // show ALL available webpack information when running
    stats: "verbose",
    // do not include credentials.js or node_modules
    plugins: [new webpack.IgnorePlugin(/credentials.js/)]
};
