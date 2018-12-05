const webpack = require('webpack');
const path = require('path');
const HtmlWabpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		"portal/workbench": path.join(__dirname, '/src/js/portal/workbench.js'),
		"km/km_center": path.join(__dirname, '/src/js/km/km_center.js'),
		"personal/calendar": path.join(__dirname, '/src/js/personal/calendar.js')
	},
	output:{
		path: path.join(__dirname, '/dist'),
		filename: "js/[name].js",
		chunkFilename:'async/js/[name].js'
		// publicPath: "../"
	},
	performance: {
		hints: false   
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				//exclude: /node_modules/,
				use: [
					{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
					{
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
				]
			},
			{
	            test: /\.html$/,
	            use: [
					{
                        loader: "file-loader",
                        options: {
							name: "[name].[ext]",
							outputPath: './async/'
                        },
                    },
                    {
                        loader: "extract-loader",
                    },
	            	{
		                loader: 'html-loader',
		                options: {
		                    attrs: ['img:src', 'img:data-src', 'li:data-src'],
		                    minimize: false
	                	}
					}
				]
			},
	        {
		        test: /\.ejs$/,
		        loader: "ejs-loader",
		    },
			{
				test: /\.js$/,
				include: /src\/js/,
				loader: "babel-loader",
				query: {
					presets: ["es2015"]
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				exclude: /node_modules/,
				loader: "url-loader?limit=8192&name=./assets/images/[name].[hash].[ext]"
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
				exclude: /node_modules/,
				loader: "file-loader?name=./assets/fonts/[name].[hash].[ext]"
			},
			{
				test: require.resolve("jquery"),
				use: [
					"expose-loader?$",
					"expose-loader?jQuery"
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
     　　 	chunkFilename: "[id].css"
		}),
		new CopyWebpackPlugin([{
			from: "./src/js/async/**/*.js",
	 　　 	to: "./async/js/",
	 	   flatten: true
		}])	
	]
}