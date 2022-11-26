import React, {createContext, useMemo, useReducer} from 'react';
import Table from './Table';
import Form from './Form';

// 지뢰찾기 맵에서 사용 할 각 좌표에서의 상태값 정의
export const CODE = {
    MINE: -7,           // 지뢰 위치
    NORMAL: -1,         // 기본값
    QUESTION: -2,       // 물음표 표시
    FLAG: -3,           // 깃발 표시
    QUESTION_MINE: -4,  // 물음표 표시를 했는데 그 위치가 지뢰인 경우
    FLAG_MINE: -5,      // 깃발 표시를 했는데 그 위치가 지뢰인 경우
    CLICKED_MINE: -6,   // 지뢰를 밟은 경우
    OPENED: 0,          // 지뢰가 없는 칸을 밟은 경우 -> 0 이상이면 다 OPENED 상태를 갖도록 구현
}

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {
    },
});   // default 값을 할당할 수 있다.

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true,
};

// 지뢰를 심는 함수
const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });

    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for (let i = 0; i < row; ++i) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; ++j) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; ++k) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const CLICK_MINE = 'CLICK_MINE';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
            };
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;

            let around = [];
            if (tableData[action.row - 1]) {
                around = around.concat(
                    tableData[action.row - 1][action.cell - 1],
                    tableData[action.row - 1][action.cell],
                    tableData[action.row - 1][action.cell + 1],
                );
            }
            around = around.concat(
                tableData[action.row][action.cell - 1],
                tableData[action.row][action.cell + 1],
            );
            if (tableData[action.row + 1]) {
                around = around.concat(
                    tableData[action.row + 1][action.cell - 1],
                    tableData[action.row + 1][action.cell],
                    tableData[action.row + 1][action.cell + 1],
                );
            }

            const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
            tableData[action.row][action.cell] = count;

            return {
                ...state,
                tableData,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;

            return {
                ...state,
                tableData,
                halted: true,
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if (tableData[action.row][action.cell] === CODE.MINE) tableData[action.row][action.cell] = CODE.FLAG_MINE;
            else tableData[action.row][action.cell] = CODE.FLAG;

            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            else tableData[action.row][action.cell] = CODE.QUESTION;

            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) tableData[action.row][action.cell] = CODE.MINE;
            else tableData[action.row][action.cell] = CODE.NORMAL;

            return {
                ...state,
                tableData,
            };
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;
    const value = useMemo(() => ({tableData: tableData, halted: halted, dispatch}), [tableData, halted]);

    return (
        <TableContext.Provider value={value}>
            <Form/>
            <div>{timer}</div>
            <Table/>
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;
