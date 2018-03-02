const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DefinePlugin = require('webpack/lib/DefinePlugin');
const {distPath, templatePath} = require('./path');


module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: distPath,
        historyApiFallback: true
    },
    output: {
        publicPath: '/'
    },
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            title: 'React redux-saga universal application',
            template: templatePath,
        }),
        new BundleAnalyzerPlugin()
    ]
});
