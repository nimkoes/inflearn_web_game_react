const React = require('react');
const ReactDom = require('react-dom');

// const RSP = require('./RSP-class');
const RSP = require('./RSP');

ReactDom.createRoot(document.querySelector('#root')).render(<RSP/>);
