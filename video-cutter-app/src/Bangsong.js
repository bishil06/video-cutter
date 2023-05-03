export default function Bangsong({bangsong, requestMemoList}) {
    return (
        <div className="bangsong">
            <h3>{bangsong.properties.이름.title[0].plain_text}</h3>
            <div>{bangsong.properties.날짜.date.start}</div>
            <button onClick={() => requestMemoList(bangsong)}>메모리스트 불러오기</button>
        </div>
    )
}