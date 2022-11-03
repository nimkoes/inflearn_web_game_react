const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval',  // ��� ��� : hidden-source-map

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
                        targets: {  // �ڵ����� ���� �������� �������ִ� ���ε�, �� ������ ���� �ڼ��� �� �� ����
                            browsers: ['> 5% in KR', 'last 2 chrome version'],  // �ֱ� 2�� ������ chrome ������ ȣȯ
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }],
    },

    // plugin �� Ȯ�� ���α׷� ���� ������ ����
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
    ],

    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
    },
};
