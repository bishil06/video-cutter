import ReactPlayer from 'react-player'
import InputRange from './InputRange'
import { useState, useEffect, memo } from 'react';
import TimeLine from './TimeLine';
import { sameVideo } from './helper';

function requestVideoMetadata(videoFilePath) {
    window.api.sendPath(videoFilePath)
}

function Player({ videoFile }) {
    const [metadata, setMetadata] = useState()
    const [start, setStart]= useState(0)
    const [end, setEnd]= useState(0)

    const action = (e, newMetadata) => {
        console.log("setMetadata", metadata, newMetadata)
        setMetadata(newMetadata)
        setStart(0)
        setEnd(0)
    }
    
    useEffect(() => {
        requestVideoMetadata(videoFile.path)
        window.api.receiveData('D', action)
        return (() => window.api.removeEventListener('D', action))
    }, [videoFile])

    return (
        <div className='playerContainer'>
            <ReactPlayer url={videoFile.path} type={videoFile.type} controls width={'100%'} height={'100%'} />
            {(metadata===undefined)?null:(<>
                <TimeLine duration={start}></TimeLine>
                <InputRange maxRange={metadata.duration} setValue={setStart} value={start}></InputRange>
                <TimeLine duration={end}></TimeLine>
                <InputRange maxRange={metadata.duration} setValue={setEnd} value={end}></InputRange>
            </>)}
        </div>
    )
}

const MemoedPlayer = memo(Player, sameVideo)

export default MemoedPlayer