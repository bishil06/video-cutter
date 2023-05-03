import { getHMS } from "./helper"

export default function MemoCard({memo, playerController}) {
    const realDuration = 60*60*9-memo.properties.Duration.formula.number
    // 아마 formula로 생성된 시간에 한국시간적용이 안되서 발생한 문제로 보여짐
    return (
        <div className="memoCard">
            <button onClick={() => playerController.seekTo(realDuration)}>{getHMS(realDuration).join(':')}</button>
            {memo.properties.이름.title.reduce((acc, v) => acc+v.plain_text, '')}
        </div>
    )
}