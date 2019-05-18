const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'panel-inicio': './src/frontend/CRUM Panel/panel-inicio.js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'src','public','js')
    }
}
