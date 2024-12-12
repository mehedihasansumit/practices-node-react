import axios from "axios"

import useScreenRecord from "../hooks/useScreenRecord";

const mimeType = "video/webm";

const ScreenRecorder = () => {

    const {
        permission,
        stream,
        videoBlob,
        mediaRecorder,
        recordingStatus,
        liveVideoFeed,
        recordedVideo,
        getCameraPermission,
        stopCameraPermission,
        startRecording,
        stopRecording
    } = useScreenRecord();


    const onSendServer = () => {
        // const blob = new Blob(recordedVideo, { type: mimeType });
        console.log({ videoBlob })
        const file = new File([videoBlob], "yourfilename.webm", { type: mimeType });
        console.log({ file })
        const form = new FormData();
        form.append("avatar", file)
        axios.post('http://localhost:3000/profile', form)
        console.log("clicked...")
    }

    return (
        <div>
            <h2>Screen Recorder</h2>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <button onClick={getCameraPermission} type="button">
                            Get Screen
                        </button>
                    ) : <button onClick={stopCameraPermission} type="button">
                        Stop Screen
                    </button>}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <button onClick={()=>stopRecording()} type="button">
                            Stop Recording
                        </button>
                    ) : null}

                    {recordingStatus === "recording" ? (
                        <button onClick={() => stopRecording(onSendServer)} type="button">
                            Stop Recording With Send Server
                        </button>
                    ) : null}
                </div>
                <div className="audio-player">
                    {
                        <video ref={liveVideoFeed} autoPlay muted style={{ maxWidth: "50vw", maxHeight: "50vh" }}></video>
                    }
                </div>
                <div style={{ display: "flex", gap: "5px", margin: "auto" }}>
                    <a download href={recordedVideo} >
                        <button>
                            Download Recording
                        </button>
                    </a>
                    <button onClick={onSendServer}>
                        Send Recording to Server
                    </button>
                </div>
            </main>
        </div>
    );
};
export default ScreenRecorder;
