import { getHMS, convertHMStoDuration } from "./helper"

export default function MemoCard({memo, playerController}) {
    // console.log(memo, memo.properties.Duration.formula.number)
    // console.log(memo.properties.생성일.created_time)
    // console.log(memo.properties.방송시작시간.rollup.date.start)
    // 9시간 넘는 방송의 경우 어떻게 나올지 궁금함
    // memo.properties.Duration.formula.number
    if (!memo.properties.실시간메모.checkbox) {
        console.log(memo, memo.properties.수동타임라인.rich_text.reduce((acc, v) => acc+v.plain_text, ''))
    }
    
    const realDuration = (memo.properties.실시간메모.checkbox)
    ?(((new Date(memo.properties.생성일.created_time) - new Date(memo.properties.방송시작시간.rollup.date.start))+60*60*9*1000)/1000 + memo.properties.초.rollup.number)
    :((memo.properties.수동타임라인.rich_text.reduce((acc, v) => acc+v.plain_text, '').length === 8)
        ?convertHMStoDuration(...memo.properties.수동타임라인.rich_text.reduce((acc, v) => acc+v.plain_text, '').split(':').map(Number))
        :0
    )
    // 아마 formula로 생성된 시간에 한국시간적용이 안되서 발생한 문제로 보여짐
    return (
        <div className="memoCard">
            <button onClick={() => playerController.seekTo(realDuration)}>{getHMS(realDuration).join(':')}</button>
            {memo.properties.이름.title.reduce((acc, v) => acc+v.plain_text, '')}
        </div>
    )
}