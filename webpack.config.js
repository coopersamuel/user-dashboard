const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Constant with our paths
const paths = {
    DIST : path.resolve(__dirname, 'dist'),
    SRC : path.resolve(__dirname, 'src')
};

module.exports = {
    entry: path.join(paths.SRC, "index.js"),
    output : {
        path : paths.DIST,
        filename : 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(scss)$/,
                use: [
                  MiniCssExtractPlugin.loader, 
                {
                  loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                      return [
                        require('precss'),
                        require('autoprefixer')
                      ];
                    }
                  }
                }, {
                  loader: 'sass-loader' // compiles Sass to CSS
                }]
              },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, "index.html"),
            filename: "./index.html",
            title: 'Pseudo-trello'
        }),
        new MiniCssExtractPlugin({
            filename: "[name][hash].css"
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 3000
    }
};