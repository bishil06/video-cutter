import { useState } from "react";

export default function MemoWriter({ writeMemoToNotion }) {
    const [memoInput, setMemoInput] = useState('')

    return (<>
        <input type="text" onChange={(e) => setMemoInput(e.target.value)} value={memoInput}></input>
        <button onClick={() => {
            writeMemoToNotion(memoInput)
            setMemoInput('')
        }}>메모작성</button>
    </>)
}