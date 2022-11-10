const React = require('react');
const {useState, useRef} = require('react');
const Try = require('./Try');

function getNumbers() {  // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];

    for (let i = 0; i < 4; ++i) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {

    // state 설정
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers);   // lazy init :: 값이 아닌 함수를 useState 에 할당 하는 경우
    const [tries, setTries] = useState([]);
    const inputRef = useRef(null);


    const onSubmitForm = (e) => {
        e.preventDefault();

        if (value === answer.join('')) {

            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: '홈런!'}];
            });

            alert('게임을 다시 시작 합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);

        } else {  // 답이 틀린 경우
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            if (tries.length >= 9) {  // 10번 이상 틀렸을 때

                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`);

                alert('게임을 다시 시작 합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);

            } else {
                for (let i = 0; i < 4; ++i) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }

                setTries((prevTries) => {
                    return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다`}];
                })
                setValue('');
            }
        }
        inputRef.current.focus();
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }


    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput}/>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {(() => {
                    const array = [];
                    for (let i = 0; i < tries.length; ++i) {
                        array.push(<Try key={`${i + 1} 차 시도 :`} tryInfo={v}/>);
                    }
                    return array;
                })()}

                {/*
                {tries.map((v, i) => {
                    return (
                        <Try key={`${i + 1} 차 시도 :`} tryInfo={v}/>  // value, index 를 props 라고 부름
                    );
                })}
                */}
            </ul>
        </>
    );
}

module.exports = NumberBaseball;
