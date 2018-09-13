let path = require('path')
let resolve = path.resolve
let webpack = require("webpack");
let DefinePlugin = webpack.DefinePlugin;	//允许在编译时配置全局常量
let EnvironmentPlugin = webpack.EnvironmentPlugin;	//使用DefinePluginon process.env键的 速记
let optimize = webpack.optimize;	//在优化阶段开始时触发
let WXAppWebpackPlugin = require("wxapp-webpack-plugin").default;
let MinifyPlugin = require('babel-minify-webpack-plugin');
const { NODE_ENV, LINT , API_HOST} = process.env;
const isDev = NODE_ENV !== 'production';
const shouldLint = !!LINT && LINT !== 'false';
const srcDir = resolve('src');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


const relativeFileLoader = (ext = '[ext]') => ({
	loader: 'file-loader',
	options: {
		useRelativePath: true,
		name: `[name].${ext}`,
		context: srcDir
	}
});
let config = (env = {}) => {
	const min = env.min;
	return {
		entry: {
			app: [
				'./src/app.js'
			]
		},
		output: {
			filename: '[name].js',
			publicPath: '/',
			path: resolve('dist')
		},
		// target: Targets[target],   不设置了。默认是微信小程序
		module: {
			rules: [
				{
					test: /\.js$/,
					include: /src/,
					exclude: [/node_modules/],
					use: ['babel-loader',shouldLint && 'eslint-loader'].filter(Boolean)
				},
				{
					test: /\.wxs$/,
					include: /src/,
					exclude: /node_modules/,
					use: [
						relativeFileLoader(),
						'babel-loader',
						shouldLint && 'eslint-loader'
					].filter(Boolean)
				},
				{
					test: /\.styl$/,
					include: /src/,	
					use: [
						relativeFileLoader('wxss'),
						{
							loader: 'stylus-loader',
							options: {
								includePaths:  resolve('src')
							},
						},
					]
				},
				{
					test: /\.(json|png|jpg|gif|wxss)$/,
					include: /src/,
					use: relativeFileLoader()
				},
				{
					test: /\.wxml$/,
					include: resolve('src'),
					use: [
						relativeFileLoader('wxml'),
						{
							loader: 'wxml-loader',
							options: {
								root: resolve('src'),
								enforceRelativePath: true
							}
						}
					]
				}
			]
		},
		plugins: [
			new EnvironmentPlugin({
				NODE_ENV: 'development'
			}),
			new DefinePlugin({
				GLOBAL_API_HOST:JSON.stringify(API_HOST)
			}),
			new WXAppWebpackPlugin({
				clear: !isDev
			}),
			new optimize.ModuleConcatenationPlugin(),
			min && new MinifyPlugin(),
			new FriendlyErrorsWebpackPlugin()
		].filter(Boolean),
		// devtool: isDev ? 'source-map' : false,  不设置了，source-map对我用处不大
		resolve: {
			modules: [resolve(__dirname, 'src'), 'node_modules']
		},
		// watch:API_HOST == 'mock' ? true :false,
		watchOptions: {
			ignored: ['node_modules/**', 'dist/**'],
			aggregateTimeout: 300
		}
	};
};
module.exports = config
