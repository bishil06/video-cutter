import Bangsong from "./Bangsong"
export default function BangsongList({bangsongList, requestMemoList}) {
    
    return (<div>
        {bangsongList.map((v, i) => {
            return (<Bangsong bangsong={v} key={i} requestMemoList={requestMemoList}></Bangsong>)
        })}
    </div>)
}