const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./WordRelay');   // ./WordRelay.jsx ���� module.exports �߱� ������ ������ ����

ReactDom.render(<WordRelay/>, document.querySelector('#root'));
