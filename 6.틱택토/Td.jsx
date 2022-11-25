import React, {useCallback, memo} from 'react';
import {CLICK_CELL} from './TicTacToe';

const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
    // console.log("td rendered");  // 성능 최적화 확인용 log
    //
    // // 무엇이 바뀌고 무엇이 바뀌지 않는지 확인하기 위한 log
    // const ref = useRef([]);
    // useEffect(() => {
    //     console.log(
    //         rowIndex === ref.current[0],
    //         cellIndex === ref.current[1],
    //         dispatch === ref.current[2],
    //         cellData === ref.current[3]
    //     );
    //     ref.current = [rowIndex, cellIndex, dispatch, cellData];
    // }, [rowIndex, cellIndex, dispatch, cellData]);

    const onClickTd = useCallback(() => {
        // 이미 데이터가 있으면 return
        if (cellData) return;
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td;
