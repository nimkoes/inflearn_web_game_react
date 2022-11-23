const React = require('react');
const ReactDom = require('react-dom');

const TicTacToe = require('./TicTacToe');

ReactDom.createRoot(document.querySelector('#root')).render(<TicTacToe/>);
