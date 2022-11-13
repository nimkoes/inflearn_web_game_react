const React = require('react');
const ReactDom = require('react-dom');

// const ResponseCheck = require('./ResponseCheck-class');
const ResponseCheck = require('./ResponseCheck');

ReactDom.createRoot(document.querySelector('#root')).render(<ResponseCheck/>);
