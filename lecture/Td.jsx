import React, {useContext} from 'react';
import {CODE, TableContext} from "./MineSearch";

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
        default:
            return {
                background: 'white',
            };
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';         // 개발 편의상 'X' 로 설정, 실제 게임을 할 때는 공백 처리
    }
};

const Td = ({rowIndex, cellIndex}) => {
    const {tableData} = useContext(TableContext);
    return (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])}>
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    );
};

export default Td;
