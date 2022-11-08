const React = require('react');
const {memo, useState} = require('react');

const Try = memo(({tryInfo}) => {
    // tryInfo.result = '1';                               // props 를 자식 컴포넌트에서 수정해야 하는 경우
    const [result, setResult] = useState(tryInfo.result);  // state 로 만든 다음 수정 한다.

    const onClick = () => {
        setResult('1');
    };

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{result}</div>
        </li>
    );
});

Try.displayName = 'Try';
module.exports = Try;
