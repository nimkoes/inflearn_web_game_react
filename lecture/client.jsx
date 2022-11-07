const React = require('react');
const ReactDom = require('react-dom');

const NumberBaseball = require('./NumberBaseball-class');
// const NumberBaseball = require('./NumberBaseball');
// import NumberBaseball from './RenderTest';

ReactDom.createRoot(document.querySelector('#root')).render(<NumberBaseball/>);
