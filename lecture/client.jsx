const React = require('react');
const ReactDom = require('react-dom');

const NumberBaseball = require('./NumberBaseball');

ReactDom.createRoot(document.querySelector('#root')).render(<NumberBaseball/>);
