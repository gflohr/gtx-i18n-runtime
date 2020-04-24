const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: {
		'esgettext-runtime': './src/index.ts',
		'esgettext-runtime.min': './src/index.ts',
	},
	mode: 'development',
	devtool: 'source-map',
	node: {
		fs: 'empty',
	},
	optimization: {
		minimize: false,
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
				terserOptions: {},
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
				query: {
					declaration: false,
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	output: {
		path: path.resolve(__dirname, '_bundles'),
		filename: '[name].js',
		libraryTarget: 'umd',
		library: 'esgettext',
		umdNamedDefine: true,
	},
};