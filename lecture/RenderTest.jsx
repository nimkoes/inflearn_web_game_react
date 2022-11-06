import React, {Component} from "react";

class Test extends Component {
    state = {
        counter: 0,
    };

    onClick = () => {
        this.setState({});
    };

    // 어떤 경우에 렌더링을 다시 할지 사용자가 지정 해주는 부분
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.counter !== nextState.counter) {
            return true;
        }
        return false;
    }

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}

export default Test;
