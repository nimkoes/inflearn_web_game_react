const React = require('react');
const ReactDom = require('react-dom');

const Lotto = require('./Lotto-class');
// const Lotto = require('./Lotto');

ReactDom.createRoot(document.querySelector('#root')).render(<Lotto/>);
