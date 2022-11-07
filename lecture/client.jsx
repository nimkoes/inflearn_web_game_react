const React = require('react');
const ReactDom = require('react-dom');

const NumberBaseball = require('./NumberBaseball-class');
// import NumberBaseball from './RenderTest';

ReactDom.createRoot(document.querySelector('#root')).render(<NumberBaseball/>);
