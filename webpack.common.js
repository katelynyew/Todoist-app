
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: "asset/resource",
            },
            {
                
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                
                test: /\.(mp3|wav|ogg)$/,
                type: "asset/resource", 
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
}