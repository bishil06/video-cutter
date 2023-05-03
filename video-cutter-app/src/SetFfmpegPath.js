export default function SetFfmpegPath() {
    return (<>
        <button onClick={() => window.api.requestOpenSelectDirectory()}>ffmpeg폴더선택</button>
    </>)
}