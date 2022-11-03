const path = require('path');

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
                            browsers: ['last 2 chrome version'],  // 최근 2개 버전의 chrome 까지만 호환
                        },
                    }],
                    '@babel/preset-react'
                ],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }],
    },

    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
    },
};
