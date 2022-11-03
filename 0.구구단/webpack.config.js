const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval',  // 운영인 경우 : hidden-source-map

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: './client',
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {  // 자동으로 옛날 브라우저를 지원해주는 것인데, 그 설정을 보다 자세히 할 수 있음
                            browsers: ['> 5% in KR', 'last 2 chrome version'],  // 최근 2개 버전의 chrome 까지만 호환
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }],
    },

    // plugin 은 확장 프로그램 같은 것으로 생각
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
    ],

    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
    },
};
