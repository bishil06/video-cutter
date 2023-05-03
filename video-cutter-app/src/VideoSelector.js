export default function VideoSelector({setVideoFile}) {
    const handleChange = (e) => {
        console.log(e.target.files)
        if (e.target.files.length === 1) {
            setVideoFile(e.target.files[0])
        }
    }

    return (
        <div width="100%">
            <input type="file" accept="video/*" onChange={handleChange} style={{width: '100%'}}/>
        </div>
        
    )
}