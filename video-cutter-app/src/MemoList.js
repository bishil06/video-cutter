import MemoCard from "./MemoCard"

export default function MemoList({memoList, playerController}) {
    return (<div>
        {memoList.map((v, i) => {
            return <MemoCard memo={v} key={i} playerController={playerController}></MemoCard>
        })}
    </div>)
}