import './App.css';
import Player from './Player';
import VideoSelector from './VideoSelector';
import { useState } from 'react';

console.log(window.api)

function App() {
  const [videoFile, setVideoFile] = useState()

  return (
    <div className="App">
      <button>ffmpeg폴더선택</button>
      <button id='preloadtest' onClick={() => window.api.sendPath(videoFile.path)}>preload test</button>
      <VideoSelector setVideoFile={setVideoFile}></VideoSelector>
      <div>
        {(videoFile!==undefined)?<Player videoFile={videoFile}></Player>:null}
      </div>
    </div>
  );
}

export default App;
