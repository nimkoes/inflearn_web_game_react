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
    dispatch: () => {
    },
});   // default 값을 할당할 수 있다.

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
};

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
            }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({tableData: state.tableData, dispatch}), [state.tableData]);

    return (
        <TableContext.Provider value={value}>
            <Form/>
            <div>{state.timer}</div>
            <Table/>
            <div>{state.result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;