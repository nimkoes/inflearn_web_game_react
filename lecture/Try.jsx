const React = require('react');
const {memo} = require('react');

const Try = memo(({tryInfo}) => {    // 구조 분해 할당
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
});

Try.displayName = 'Try';
module.exports = Try;
