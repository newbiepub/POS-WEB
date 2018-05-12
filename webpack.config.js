const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'server', 'index.js'),
    target: "node",
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'PORT': JSON.stringify(process.env.PORT),
                'API_URL': JSON.stringify('https://posappapi.herokuapp.com'),
                'DOMAIN_NAME': JSON.stringify('poswebmanagement.herokuapp.com')
            }
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
    ]
};