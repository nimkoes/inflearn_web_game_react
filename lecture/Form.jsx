import React, {useCallback, useState} from 'react';

const Form = () => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, []);

    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    }, []);

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, []);

    const onClickBtn = useCallback(() => {

    }, []);

    return (
        <div>
            <input typr="number" placeholder="세로" value={row} onChange={onChangeRow}/>
            <input typr="number" placeholder="가로" value={cell} onChange={onChangeCell}/>
            <input typr="number" placeholder="지뢰" value={mine} onChange={onChangeMine}/>

            <button value={mine} onChange={onClickBtn}>시작</button>
        </div>
    );
};

export default Form;
