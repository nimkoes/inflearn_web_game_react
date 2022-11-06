const React = require('react');
const {Component} = require('react');
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

class NumberBaseball extends Component {
    /*
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            value: '',
            answer: getNumbers(),
            tries: [],
        }
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    */

    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const {answer, value, tries} = this.state;

        if (value === answer.join('')) {
            this.setState({
                result: '홈런!',
                tries: [...tries, {try: value, result: '홈런!'}],
            });

            alert('게임을 다시 시작 합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });

        } else {  // 답이 틀린 경우
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            if (tries.length >= 9) {  // 10번 이상 틀렸을 때
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`,
                });

                alert('게임을 다시 시작 합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });

            } else {
                for (let i = 0; i < 4; ++i) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }

                this.setState({
                    tries: [...tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다`}],
                    value: '',
                })
            }
        }
    }

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const {result, value, tries} = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={value} onChange={this.onChangeInput}/>
                </form>
                <div>시도 : {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1} 차 시도 :`} tryInfo={v}/>  // value, index 를 props 라고 부름
                        );
                    })}
                </ul>
            </>
        );
    }
}

module.exports = NumberBaseball;
