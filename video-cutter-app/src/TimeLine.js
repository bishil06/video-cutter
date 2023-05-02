import { getHMS } from "./helper"

export default function TimeLine({duration}) {
    const [hh, mm, ss] = getHMS(Number(duration))

    return (<>
        <input type="number" min={0} max={99} value={hh}></input>:
        <input type="number" min={0} max={99} value={mm}></input>:
        <input type="number" min={0} max={99} value={ss}></input>
    </>)
}