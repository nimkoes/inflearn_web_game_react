const path = require('path');

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
                            browsers: ['last 2 chrome version'],  // �ֱ� 2�� ������ chrome ������ ȣȯ
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
