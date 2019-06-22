const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const sass = require('sass');

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader', 'angular2-template-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|svg|gif)(\?v=.*)?$/,
                loader: "file-loader",
            },
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.scss$/,
                use: ['to-string-loader', 'css-loader', {
                    loader: 'sass-loader',
                    options: { implementation: sass }
                }],
                exclude: /(vendor\.scss|global\.scss)/
            },
            {
                test: /(vendor\.scss|global\.scss)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: { implementation: sass }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: /(vendor\.css|global\.css)/
            },
            {
                test: /(vendor\.css|global\.css)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/app/'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            config: JSON.stringify({
                apiUrl: 'http://localhost:4000' // change API URL HERE
            })
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true,
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};