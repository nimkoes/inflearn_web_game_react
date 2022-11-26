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
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });

            const checked = []; // 중복 검사 방지
            const checkAround = (row, cell) => {
                // 테이블 범위를 넘어가는 경우
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) return;

                // 이미 열린 칸이거나 지뢰가 있는 칸인 경우
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][cell])) return;

                // 이미 검사한 경우
                if (checked.includes(row + '/' + cell)) return;
                else checked.push(row + '/' + cell);

                let around = [tableData[row][cell - 1], tableData[row][cell + 1]];
                if (tableData[row - 1]) {
                    around = around.concat(tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]);
                }
                if (tableData[row + 1]) {
                    around = around.concat(tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]);
                }

                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;

                // 주변칸 열기
                if (count === 0) {
                    if (row > -1) {
                        const near = [[row, cell - 1], [row, cell + 1]];
                        if (row - 1 > -1) {
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        if (row + 1 < tableData.length) {
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }

                        near.filter(v => !!v).forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) checkAround(n[0], n[1]);
                        });
                    }
                }
                tableData[row][cell] = count;
            };

            checkAround(action.row, action.cell);
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
