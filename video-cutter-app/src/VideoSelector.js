import { useState } from 'react'

export default function VideoSelector({setVideoFile}) {
    const [urlInput, setUrlInput] = useState()

    const handleChange = (e) => {
        console.log(e.target.files)
        if (e.target.files.length === 1) {
            setVideoFile(e.target.files[0])
        }
    }

    const urlHandle = (e) => {
        setVideoFile({ path: urlInput})
    }

    return (
        <div width="100%">
            <input type="file" accept="video/*" onChange={handleChange} style={{width: '100%'}}/>
            <label>웹주소</label><input type="url" onChange={(e) => setUrlInput(e.target.value)} value={urlInput}></input><button onClick={urlHandle}>입력</button>
        </div>
        
    )
}