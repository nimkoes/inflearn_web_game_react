const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./WordRelay');   // ./WordRelay.jsx 에서 module.exports 했기 때문에 가능한 문장

ReactDom.render(<WordRelay/>, document.querySelector('#root'));
