const React = require('react');
const ReactDom = require('react-dom');

const NumberBaseball = require('./ResponseCheck-class');
// const NumberBaseball = require('./ResponseCheck');

ReactDom.createRoot(document.querySelector('#root')).render(<NumberBaseball/>);
