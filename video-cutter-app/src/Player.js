import ReactPlayer from 'react-player'
import InputRange from './InputRange'
import { useState, useEffect, memo, useRef } from 'react';
import TimeLine from './TimeLine';
import { sameVideo } from './helper';

function requestVideoMetadata(videoFilePath) {
    window.api.sendPath(videoFilePath)
}

function Player({ videoFile, setPlayerController }) {
    const playerRef = useRef()
    const [metadata, setMetadata] = useState()
    const [start, setStart]= useState(0)
    const [end, setEnd]= useState(0)

    const action = (e, newMetadata) => {
        console.log("setMetadata", metadata, newMetadata)
        setMetadata(newMetadata)
        setStart(0)
        setEnd(0)
    }

    const keyDownHandler = (e) => {
        console.log(e.key)
        if (e.key === '.') {
            if (playerRef !== undefined) {
                playerRef.current.seekTo(playerRef.current.getCurrentTime()+3)
            }
        }
        else if (e.key === ',') {
            if (playerRef !== undefined) {
                playerRef.current.seekTo(playerRef.current.getCurrentTime()-3)
            }
        }
    }

    const playerController = { 
        seekTo(seconds) {
            console.log(playerRef)
            return playerRef.current.seekTo(seconds, "seconds")
        },  
        getDuration() {
            return playerRef.current.getDuration()
        },
        getCurrentTime() {
            return playerRef.current.getCurrentTime()
        }
    }
    useEffect(() => {
        setPlayerController(playerController)
        window.addEventListener("keydown", keyDownHandler)

        return () => {
            window.removeEventListener('keydown', keyDownHandler)
        }
    })
    
    useEffect(() => {
        requestVideoMetadata(videoFile.path)
        window.api.receiveData('D', action)
        return (() => window.api.removeEventListener('D', action))
    }, [videoFile])

    return (
        <div className='playerContainer'>
            <ReactPlayer ref={playerRef} url={videoFile.path} type={videoFile.type} controls width={'100%'} height={'100%'}/>
            {(metadata===undefined)?null:(<>
                <TimeLine duration={start} setValue={setStart} playerController={playerController}></TimeLine>
                <InputRange maxRange={metadata.duration} setValue={setStart} value={start}></InputRange>
                <TimeLine duration={end} setValue={setEnd} playerController={playerController}></TimeLine>
                <InputRange maxRange={metadata.duration} setValue={setEnd} value={end}></InputRange>
            </>)}
        </div>
    )
}

const MemoedPlayer = memo(Player, sameVideo)

export default MemoedPlayer