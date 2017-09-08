var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var glob = require('glob');
require('babel-polyfill');

var port = 80;
var nodeEnv = process.env.NODE_ENV;

var pluginHtmlArray = [];
var files = glob.sync(path.join(__dirname + '/src/**.html'));
  
files.forEach(function(file){
    var entryName = path.basename(file, '.html');
    pluginHtmlArray.push(
        new HtmlWebpackPlugin({
            filename: './views/' + entryName + '.html',
            template: file,
            chunksSortMode: 'none',
            chunks: ['commons', entryName],
            inject: true,
            minify: false,
            alwaysWriteToDisk: true
        })
    );
});


var ip = {
    local: 'http://127.0.0.1'
};

var __PUBLICPATH__ = '/dist/',
    __PATH__ = path.join(__dirname, './dist/'),
    __DOMAIN = '';

var config = {
    stats: {
        color: true,
        chunks: false,
        children: false,
        inline: true
    },
    entry: {
        commons: ['babel-polyfill'],
        index: './src/main.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }, {
            test: /\.vue$/,
            loader: 'vue',
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style", "css", "prefix")
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            loader: 'file?name=/images/[name]' +(nodeEnv == 'ONLINE' ? '.[hash]' : '') + '.[ext]',
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style", "css!less")
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
           test: /\.(woff2|woff|ttf|eot|svg|otf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
           loaders: ["url-loader?name=/dist/css/fonts/[name].[ext]"]
        }]
    },
    output: {
        publicPath: __PUBLICPATH__,
        path:  __PATH__,
        filename: "js/[name].bundle" + (nodeEnv == 'ONLINE' ? '.[chunkhash]' : '') +  ".js"
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('css'),
            less: ExtractTextPlugin.extract('css!less')
        }
    },
    plugins: [
        new ExtractTextPlugin("css/[name].bundle" + (nodeEnv == 'ONLINE' ? '.[contenthash]' : '') + ".css"),
        new webpack.DefinePlugin({
            'TEST': false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "js/commons.bundle" + (nodeEnv == 'ONLINE' ? ".[chunkhash]" : '') + ".js"
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, 'dist')
        })
    ].concat(pluginHtmlArray),
    devServer: {
        stats: {
            color: true,
            chunks: false,
            children: false,
            inline: true
        },
        host: '0.0.0.0',
        port: port,
        changeOrigin: true,
        proxy: {

        }
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};

module.exports = config;
