const React = require('react');
const {Component, createRef} = require('react');

class ResponseCheck extends Component {
    state = {
        state: '',  // ready, go, waiting 상태 구분
        message: '클릭해서 시작하세요.',
        result: [],
    };

    onClickScreen = () => {

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
