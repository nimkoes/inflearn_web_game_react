const React = require('react');
const {Component, createRef} = require('react');

class ResponseCheck extends Component {
    state = {
        state: 'waiting',  // ready, now, waiting 상태 구분
        message: '클릭해서 시작하세요.',
        result: [],
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const {state, message, result} = this.state;

        if (state === 'waiting') {

            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });

            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭',
                });
            }, Math.floor(Math.random() * 1000) + 2000);  // 2초~3초 랜덤

            // 시작 시간 설정
            this.startTime = new Date();

        } else if (state === 'ready') {  // 성급하게 클릭

            // setTimeout 제거
            clearTimeout(this.timeout);

            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
            });

        } else if (state === 'now') {  // 반응속도 체크

            // 종료 시간 설정
            this.endTime = new Date();

            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime],
                };
            });
        }

    };

    renderAverage = () => {
        const {result} = this.state;
        return result.length === 0
            ? null
            : <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>;
    };

    render() {
        const {state, message} = this.state;
        return (
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}>

                    {message}
                </div>

                {/** render() 구현부가 너무 지저분한 경우 외부에 정의
                 {this.state.result.length !== 0
                        && <div>평균 시간 : {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>}
                 */}
                {this.renderAverage()}
            </>
        );
    }
}

module.exports = ResponseCheck;
