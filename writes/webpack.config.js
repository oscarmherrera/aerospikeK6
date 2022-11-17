const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        write: './writes.ts',

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
        filename: '[name].bundle.js',
    },
    module: {
        rules: [{ test: /\.js$/, use: 'babel-loader' }],
    },
    target: 'web',
    externals: /k6(\/.*)?/,
};
