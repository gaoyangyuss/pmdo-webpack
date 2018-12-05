const webpack = require('webpack');
const path = require('path');
const HtmlWabpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: "cheap-module-eval-source-map",
	devServer: {
        // 设置服务器访问的基本目录
        contentBase: './dist', 
        // 设置打开指定页面
        openPage: 'workbench.html',
        // 设置服务器的ip地址,可以是localhost
        host: 'localhost',
        // 设置端口
        port: 8090,
        // 设置自动拉起浏览器
        open: true
        // 设置热更新
        /*hot: true*/
	},
	plugins: [
		new HtmlWabpackPlugin({
			template: path.join(__dirname, '/src/portal/workbench.js'),
			filename: "workbench.html",
			favicon: "./src/assets/images/favicon.ico",
			chunks: ["portal/workbench"]
		}),
		new HtmlWabpackPlugin({
			template: path.join(__dirname, '/src/km/km_center.js'),
			filename: "km_center.html",
			favicon: "./src/assets/images/favicon.ico",
			chunks: ["km/km_center"]
		}),
		new HtmlWabpackPlugin({
			template: path.join(__dirname, '/src/personal/calendar.js'),
			filename: "calendar.html",
			favicon: "./src/assets/images/favicon.ico",
			chunks: ["personal/calendar"]
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"windown.jQuery": "jquery",
			"windown.$": "jquery"
		})
	]
})