const React = require('react');
const {useState, useRef, useEffect, useMemo, useCallback} = require('react');
const Ball = require("./Ball");

function getWinNumbers() {
    console.log('getWinNumbers');

    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];

    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), [])
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    // componentDidMount 만 동작 하도록 선언
    useEffect(() => {}, []);

    // componentDidUpdate 단계만 실행 하고 싶은 경우 적용 해볼수 있는 패턴
    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        }
        // ajax call ...
    }, [/*바뀌는 값*/]);

    useEffect(() => {
        for (let i = 0; i < winNumbers.length - 1; ++i) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 500);
        }

        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 3500);

        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        }
    }, [timeouts.current]); // 빈 배열이면 componentDidMount 와 동일
    // 배열에 요소가 있으면 componentDidMount 랑 componentDidUpdate 둘 다 수행

    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, []);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한번 더!</button>}
        </>
    );
};

module.exports = Lotto;
