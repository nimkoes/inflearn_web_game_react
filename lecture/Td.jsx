import React, {useCallback} from 'react';
import {CLICK_CELL} from './TicTacToe';

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {

    const onClickTd = useCallback(() => {
        // 이미 데이터가 있으면 return
        if (cellData) return;
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
};

export default Td;
