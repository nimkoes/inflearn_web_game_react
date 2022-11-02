const React = require('react');
const {useState, useRef} = React;

const GuGuDan = () => {
    // state 선언 방법
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));    // setFirst 는 first 용 setState
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));  // setSecond 는 second 용 setState
    const [value, setValue] = useState('');    // setValue 는 value 용 setState
    const [result, setResult] = useState('');  // setResult 는 result 용 setState
    // 주의할 점은 state 선언은 함수 컴포넌트 내에 선언 해야 한다는 것, 외부에 선언하면 안됨

    const inputRef = useRef(null);  // ref 사용 방법도 바뀜


    // 이벤트 리스너는 class 가 없어서 클래스 메소드를 사용할 수 없지만, 똑같이 함수를 선언하면 된다.
    const onSubmitForm = (e) => {
        e.preventDefault();

        if (parseInt(value) === first * second) {
            setResult('정답:' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
        } else {
            setResult('땡');
            setValue('');
        }

        inputRef.current.focus();  // dom 에 접근 할때는 current 를 사용 해야 하는 부분이 다른 부분
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <div>{first} 곱하기 {second} 는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value}/>
                <button>입력!</button>
            </form>
            <div id="result">{result}</div>
        </>
    );
}

module.exports = GuGuDan;
