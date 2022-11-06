const React = require('react');

const Try = ({tryInfo}) => {    // 구조 분해 할당
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
}

module.exports = Try;
