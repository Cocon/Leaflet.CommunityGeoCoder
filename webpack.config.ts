import { Configuration } from 'webpack';

const config: Configuration = {
	entry: {
		'bundle': ["./src/index.ts"]
	},
	externals: {
		leaflet: "L"
	},
	output: {
		filename: 'bundle.js',
		library: {
			type: "umd",
		},
		globalObject: 'this'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		],
	},
	mode: "production",
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	}
};

export default config;