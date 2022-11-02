const path = require('path');
// -> node ���� ��� ������ �ϱ� ���� �⺻ �����ϴ� ��

module.exports = {
    name: 'word-relay-setting', // ���� ������ �̸� : ������ ���� �������� ����
    mode: 'development',        // � ȯ�濡���� 'production' ���� ����
    devtool: 'eval',

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    // �Է�
    entry: {
        app: ['./client'],
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }],
    },

    // ���
    output: {
        path: path.join(__dirname, 'dist'),
        // path.join -> ��θ� �˾Ƽ� ���� �ش�
        // __dirname -> webpack.config.js �� �ִ� lecture ���丮 (���� ����)
        filename: 'app.js',
    },
};