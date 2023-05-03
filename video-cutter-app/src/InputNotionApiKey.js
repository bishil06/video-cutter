import { useState, useEffect } from 'react';

export default function InputNotionApiKey({setNotionApiKey}) {
    const [inputKey, setInputKey] = useState()
    const [active, setActive] = useState(true)

    return (
    <>
        <button onClick={() => setActive(!active)}>{active?'notion api key 입력창 닫기':'notion api key 입력창 열기'}</button>
        <div className={active?'keyInputActive':'keyInputDeActive'}>
            <label>Notion API Key: </label>
            <input onChange={(e) => setInputKey(e.target.value)} value={inputKey}></input>
            <button onClick={() => setNotionApiKey(inputKey)}>입력</button>
        </div>
    </>
    )
}