import React, {useCallback, useEffect, useState, useTransition} from 'react';

export default function UseTransitionSample() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const [result, setResult] = useState("");
    const [loading, startTransition] = useTransition();

    const onChange = useCallback((e) => {
        setName(e.target.value);
        // transition 적용 전
        // setResult(e.target.value + "의 결과");

        // transition 적용 부분 !!!
        startTransition(() => {
            setResult(e.target.value + "의 결과");
        });
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(id);
        }
    }, []);

    console.log("render", name);

    return (
        <div>
            <div>{count}</div>
            <input value={name} onChange={onChange}/>
            {loading ? <div>로딩중...</div> : null}
            {name ? Array(1000).fill().map((v, i) => <div key={i}>{result}</div>) : null}
        </div>
    );
}
