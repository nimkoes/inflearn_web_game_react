const React = require('react');
const {useState, useReducer, useCallback} = require('react');
const Table = require('./Table');

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
};

const SET_WINNER = 'SET_WINNER';

// dispatch 될 때마다 실행하는 부분
const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner;  이렇게 하면 안됨.
            // 항상 새로운 객체를 만들고 바뀐 값만 새로 넣어야 한다.
            return {
                ...state,
                winner: action.winner,
            }
    }
};

const TicTacToe = () => {
    // const [winner, serWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

    const [state, dispatch] = useReducer(reducer, initialState);

    const onClickTable = useCallback(() => {
        dispatch({type: SET_WINNER, winner: 'O'});
    }, []);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData}/>
            {state.winner && <div>{state.winner} 님의 승리</div>}
        </>
    );
};

module.exports = TicTacToe;
