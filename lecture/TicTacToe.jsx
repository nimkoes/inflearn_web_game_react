const React = require('react');
const {useState, useReducer} = require('react');
const Table = require('./Table');

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
};

const reducer = (state, action) => {
};

const TicTacToe = () => {
    // const [winner, serWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <Table/>
            {winner && <div>{winner} 님의 승리</div>}
        </>
    );
};

module.exports = TicTacToe;
