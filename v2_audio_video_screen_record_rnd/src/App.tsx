import { useEffect } from 'react'
import './App.css'
import AudioRecorder from './components/AudioRecorder'
import AutoScreenRecorder from './components/AutoScreenRecord'
import ScreenRecorder from './components/ScreenRecord'
import VideoRecorder from './components/VideoRecorder'
import { detectExtensionByDOM, detectExtensionByJSChanges } from "./lib/browerExtensionDetect"

function App() {
  useEffect(() => {
    console.log(detectExtensionByDOM())
    if (detectExtensionByDOM()) {
      console.log('Extension detected via DOM inspection.');
    }

    detectExtensionByJSChanges()
  }, []);
  return (
    <>
      HI! Man...
      {/* <HiddenScreenRecord /> */}
      {/* <AudioRecorder/> */}
      {/* <VideoRecorder/> */}
      {/* <ScreenRecorder/> */}
      <AutoScreenRecorder />
    </>
  )
}

export default App
