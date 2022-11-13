const React = require('react');
const {Component, createRef} = require('react');

class RSP extends Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0,
    };

    // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 한다.
    componentDidMount() {
    }

    // 리렌더링 후
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다.
    componentWillUnmount() {
    }

    render() {
        const {result, score, imgCoord} = this.state;
        return (
            <>
                <div id="computer"
                     style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
                <div>
                    <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

module.exports = RSP;
