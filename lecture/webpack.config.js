const path = require('path');
// -> node 에서 경로 조작을 하기 위해 기본 제공하는 것

module.exports = {
    name: 'word-relay-setting', // 웹팩 설정의 이름 : 무엇을 위한 설정인지 명시
    mode: 'development',        // 운영 환경에서는 'production' 으로 변경
    devtool: 'eval',

    resolve: {
        extensions: ['.js', '/jsx'],
    },

    // 입력
    entry: {
        app: ['./client'],
    },

    // 출력
    output: {
        path: path.join(__dirname, 'dist'),
        // path.join -> 경로를 알아서 합쳐 준다
        // __dirname -> webpack.config.js 가 있는 lecture 디렉토리 (현재 폴더)
        filename: 'app.js',
    },
};
