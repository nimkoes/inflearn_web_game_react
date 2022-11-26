import React, {memo, useCallback, useContext, useMemo} from 'react';
import {CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext} from "./MineSearch";

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            };
        default:
            return {
                background: 'white',
            };
    }
};

const getTdText = (code) => {
    console.log("렌더링을 하면서 어떤 text 를 보여줄지 정하는 함수를 실행 합니다.");
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';         // 개발 편의상 'X' 로 설정, 실제 게임을 할 때는 공백 처리
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
};

const Td = memo(({rowIndex, cellIndex}) => {
    const {tableData, dispatch, halted} = useContext(TableContext);


    const onClickTd = useCallback(() => {
        if (halted) return;

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;

        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) return;

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex})
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex})
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex})
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex]], halted);

    console.log("Td 함수 컴포넌트가 실행 되었습니다.");

    return useMemo(() => (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])} onClick={onClickTd} onContextMenu={onRightClickTd}>
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    ), [tableData[rowIndex][cellIndex]]);
});

export default Td;
