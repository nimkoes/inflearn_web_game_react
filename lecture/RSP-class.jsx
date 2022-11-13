const React = require('react');
const {Component, createRef} = require('react');

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

class RSP extends Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0,
    };

    interval;

    // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 한다.
    componentDidMount() {
        this.interval = setInterval(() => {
            const {imgCoord} = this.state;  // 비동기 함수가 외부 변수를 참조하면 클로저가 발생한다.
            if (imgCoord == rspCoords.바위) {
                this.setState({
                    imgCoord: rspCoords.가위,
                });
            } else if (imgCoord === rspCoords.가위) {
                this.setState({
                    imgCoord: rspCoords.보,
                });
            } else if (imgCoord === rspCoords.보) {
                this.setState({
                    imgCoord: rspCoords.바위,
                });
            }
        }, 1000);
    }

    // 리렌더링 후
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다.
    componentWillUnmount() {
        clearInterval(this.interval);
    }


    onClickBtn = (choice) => {

    };

    render() {
        const {result, score, imgCoord} = this.state;
        return (
            <>
                <div id="computer"
                     style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
                <div>
                    <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

module.exports = RSP;
