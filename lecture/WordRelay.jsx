const React = require('react');  // npm 에서 react 를 불러오는 것으로 꼭 필요한 부분
const {useState, useRef} = React;

const WordRelay = () => {
    const [word, setWord] = useState('감자');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (word[word.length - 1] === e.target.children.word.value[0]) {
            setResult('딩동뎅');
            setWord(e.target.children.word.value);
        } else {
            setResult('땡');
        }
        e.target.children.word.value = '';
        inputRef.current.focus();
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input id='word' ref={inputRef}/>
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    )
}

module.exports = WordRelay;
