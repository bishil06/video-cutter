import { useRef } from 'react'
import { getHMS } from "./helper"

export default function TimeLine({duration, setValue, playerController}) {
    const sRef = useRef()
    const mRef = useRef()
    const hRef = useRef()

    const [hh, mm, ss] = getHMS(Number(duration))

    function onChangeHandle() {
        const s = Number(sRef.current.value)
        const m = Number(mRef.current.value)
        const h = Number(hRef.current.value)

        setValue(s+m*60+h*60*60)
    }

    return (<>
        <button onClick={() => setValue(playerController.getCurrentTime())}>현재재생시간으로 설정</button>
        <button onClick={() => playerController.seekTo(duration)}>이동</button>
        <input type="number" ref={hRef} min={0} max={99} value={hh} onChange={onChangeHandle}></input>:
        <input type="number" ref={mRef} min={0} max={99} value={mm} onChange={onChangeHandle}></input>:
        <input type="number" ref={sRef} min={0} max={99} value={ss} onChange={onChangeHandle}></input>
    </>)
}