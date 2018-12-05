const webpack = require('webpack');
const path = require('path');
const HtmlWabpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');

module.exports = merge(baseWebpackConfig, {
	mode:'production',
	devtool:"cheap-module-source-map",
	optimization: {
        splitChunks: {
            chunks: "all",
		    minSize: 30000,
		    minChunks: 2,
		    maxAsyncRequests: 5,
		    maxInitialRequests: 3,
		    name: true,
		    cacheGroups: {
		        default: {
		            minChunks: 2,
		            priority: -20,
		            reuseExistingChunk: true,
		        },
		        vendors: {
		            test: /[\\/]node_modules[\\/]/,
		            priority: -10
		        }
		    }
        }
    }, 
	plugins:[
		new HtmlWabpackPlugin({
			template:__dirname + "/src/portal/workbench.js",
			filename:"workbench.html",
			favicon:"./src/assets/images/favicon.ico",
			chunks:["portal/workbench","vendors~personal/calendar~portal/workbench","vendors~km/km_center~personal/calendar~portal/workbench"]
		}),
		new HtmlWabpackPlugin({
			template:__dirname + "/src/km/km_center.js",
			filename:"km_center.html",
			favicon:"./src/assets/images/favicon.ico",
			chunks:["km/km_center","vendors~km/km_center~personal/calendar~portal/workbench","vendors~km/km_center"]
		}),
		new HtmlWabpackPlugin({
			template: path.join(__dirname, '/src/personal/calendar.js'),
			filename: "calendar.html",
			favicon: "./src/assets/images/favicon.ico",
			chunks: ["personal/calendar","vendors~personal/calendar~portal/workbench","vendors~km/km_center~personal/calendar~portal/workbench"]
		}),
		new webpack.ProvidePlugin({
			$:"jquery",
			jQuery:"jquery",
			"windown.jQuery":"jquery",
			"windown.$":"jquery"
		})
	]
})