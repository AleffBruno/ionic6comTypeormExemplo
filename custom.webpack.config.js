const webpack = require('webpack');
const path = require('path');

console.log('The custom config is used <<<<<<<<<<<<<< ');
module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            'window.SQL': path.join(__dirname, './node_modules/sql.js/dist/sql-asm.js'),
        }),
        new webpack.ProvidePlugin({
            'window.SQL': 'sql.js/js/sql.js'
        }),
        new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
            result.request = result.request.replace(/typeorm/, "typeorm/browser");
        })
    ],
    resolve: {
        fallback: {
            "path": require.resolve("./node_modules/path-browserify"),
            "crypto": require.resolve("./node_modules/crypto-browserify"),
            "stream": require.resolve("./node_modules/stream-browserify"),
            fs: false,
            net: false,
            tls: false
        }
    },
    optimization: {
        minimize: false,
    }
};