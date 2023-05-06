import './App.css';
import Player from './Player';
import VideoSelector from './VideoSelector';
import { useState, useEffect } from 'react';
import { Allotment } from 'allotment'
import "allotment/dist/style.css"
import InputNotionApiKey from './InputNotionApiKey';
import BangsongList from './BangsongList';
import MemoList from './MemoList';

console.log(window.api)

function App() {
  const [playerController, setPlayerController] = useState()
  const [videoFile, setVideoFile] = useState()
  const [notionApiKey, setNotionApiKey] = useState()
  const [notionDbData, setNotionDbData] = useState()
  const [bangsongList, setBangsongList] = useState()
  const [memoToggle, setMemoToggle] = useState(false)
  const [selectedBangsong, setSelectedBangsong] = useState()
  const [memoList, setMemoList] = useState()

  const sendNotionDbDataAction = (e, notionDbDatas) => {
    console.log(notionDbDatas)
    const obj = {}
    notionDbDatas.forEach(notionDbData => {
      if (notionDbData.title[0].plain_text === '메모리스트') {
        obj['memoDB'] = notionDbData
      }
      else {
        obj['bangsongDB'] = notionDbData
      }
    });

    setNotionDbData(obj)
  }

  const sendBangsongListAction = (e, { bangsongDB, results }) => {
    console.log(bangsongDB, results)
    setBangsongList(results)
  }

  const sendMemoListAction = (e, { memoDB, results, bangsong }) => {
    console.log(memoDB, results, bangsong)
    
    setSelectedBangsong(bangsong)
    setMemoList(results)
  }

  console.log('notionDbData', notionDbData)
  
  useEffect(() => {
    if (notionApiKey !== undefined) {
      console.log('setNotiionApiKey', notionApiKey)
      window.api.sendNotionApiKey(notionApiKey)
      window.api.receiveData('sendNotionDbData', sendNotionDbDataAction)
      window.api.receiveData('sendBangsongList', sendBangsongListAction)
      window.api.receiveData('sendMemoList', sendMemoListAction)
      
      
      return (() => {
        window.api.removeEventListener('sendNotionDbData', sendNotionDbDataAction)
        window.api.removeEventListener('sendBangsongList', sendBangsongListAction)
        window.api.removeEventListener('sendMemoList', sendMemoListAction)
      })
    }
  }, [notionApiKey])

  function requestBangsongList() {
    setMemoToggle(false)
    return window.api.requestBangsongList(notionDbData['bangsongDB'])
  }

  function requestMemoList(bangsong) {
    console.log(bangsong)
    setMemoToggle(true)
    return window.api.requestMemoList(notionDbData['memoDB'], bangsong)
  }

  function makeRequestWriteMemoToNotion() {
    return (hmsString) => (memoTitle) => {
      console.log(notionDbData['memoDB'].id, selectedBangsong.id, memoTitle, hmsString)
      return window.api.requestWriteMemoToNotion(notionDbData['memoDB'].id, selectedBangsong.id, memoTitle, hmsString)
    }
  }

  return (
    <div className="App">
      <InputNotionApiKey setNotionApiKey={setNotionApiKey}></InputNotionApiKey>
      {/* <button>ffmpeg폴더선택</button> */}
      {/* <button id='새로고침' onClick={() => window.api.sendPath(videoFile.path)}>preload test</button> */}
      <VideoSelector setVideoFile={setVideoFile}></VideoSelector>
      <div className='allotmentContainer'>
        <Allotment defaultSizes={[3, 1]} className='allotment'>
          <Allotment.Pane>
            <div style={{textAlign: 'center'}}>
              <h1>video</h1>
              {(videoFile!==undefined)?<Player videoFile={videoFile} setPlayerController={setPlayerController} makeRequestWriteMemoToNotion={makeRequestWriteMemoToNotion()} requestWriteMemoToNotion={makeRequestWriteMemoToNotion()}></Player>:null}
            </div>
          </Allotment.Pane>
          <Allotment.Pane>
            <div style={{ overflowY: "auto", height: "100%", textAlign: "left " }}>
              {(notionDbData!==undefined)?
                (
                // 방송 리스트 가져오기
                <div>
                  <button onClick={requestBangsongList}>방송리스트 가져오기</button>
                </div>)
              :null}
              {(memoToggle)?
              ((memoList !== undefined)?<>
                <h1>메모</h1>
                <MemoList memoList={memoList} playerController={playerController}></MemoList>
              </>: null):
              ((bangsongList!==undefined)?(<><h1>방송</h1><BangsongList bangsongList={bangsongList} requestMemoList={requestMemoList}></BangsongList></>):null)}
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
}

export default App;
