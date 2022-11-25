import React, {useMemo} from 'react';
import Td from "./Td";

const Tr = ({rowData, rowIndex, dispatch}) => {
    // console.log("tr rendered");  // 성능 최적화 확인용 log
    //
    // // 무엇이 바뀌고 무엇이 바뀌지 않는지 확인하기 위한 log
    // const ref = useRef([]);
    // useEffect(() => {
    //     console.log(
    //         rowData === ref.current[0],
    //         rowIndex === ref.current[1],
    //         dispatch === ref.current[2]
    //     );
    //     ref.current = [rowData, rowIndex, dispatch];
    // }, [rowData, rowIndex, dispatch]);

    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                useMemo(
                    () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
                    [rowData[i]]
                )
            ))}
        </tr>
    );
};

export default Tr;
