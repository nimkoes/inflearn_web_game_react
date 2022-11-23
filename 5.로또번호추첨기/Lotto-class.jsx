const React = require('react');
const {Component, createRef} = require('react');
const Ball = require('./Ball');

function getWinNumbers() {
    console.log('getWinNumbers');

    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];

    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    // state 에 숫자가 추가되면 render 가 실행 되도록 구성
    state = {
        winNumbers: getWinNumbers(),    // 당첨 숫자들
        winBalls: [],   // 앞에 6개 숫자
        bonus: null,    // 마지막 1개 숫자
        redo: false,
    };

    timeouts = [];

    runTimeouts = () => {
        const {winNumbers} = this.state;

        for (let i = 0; i < winNumbers.length - 1; ++i) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 500);
        }

        this.timeouts[6] = setTimeout(() => {
            this.setState({
                    bonus: winNumbers[6],
                    redo: true,
                }
            )
        }, 3500);
    };

    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v) => clearTimeout(v));
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),    // 당첨 숫자들
            winBalls: [],   // 앞에 6개 숫자
            bonus: null,    // 마지막 1개 숫자
            redo: false,
        });
        this.timeouts = [];
    };

    render() {
        const {winBalls, bonus, redo} = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v}/>)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus}/>}
                {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
            </>
        );
    }
}

module.exports = Lotto;
