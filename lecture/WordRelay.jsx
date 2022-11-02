const React = require('react');  // npm 에서 react 를 불러오는 것으로 꼭 필요한 부분
const {Component} = React;

class WordRelay extends Component {
    state = {
        text: 'Hello, webpack',
    };

    render() {
        return <h1>{this.state.text}</h1>
    }
}

module.exports = WordRelay;
