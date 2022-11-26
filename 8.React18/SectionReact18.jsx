import React, {useLayoutEffect, useState} from 'react';

const SectionReact18 = () => {
    const [name, setName] = useState("");

    // useEffect(() => {
    //     setName("nimkoes");
    // }, []);

    useLayoutEffect(() => {
        setName("nimkoes");
    }, []);

    console.log("render>> ", name);

    return (
        <div>
            <div>안녕하세요. {name} 입니다.</div>
            <div>안녕하세요. {name} 입니다.</div>
            <div>안녕하세요. {name} 입니다.</div>
            <div>안녕하세요. {name} 입니다.</div>
            <div>안녕하세요. {name} 입니다.</div>
            <div>안녕하세요. {name} 입니다.</div>
        </div>
    );
};

export default SectionReact18;
