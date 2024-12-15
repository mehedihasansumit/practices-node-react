import useScreenRecord from "../hooks/useScreenRecord";

const ScreenRecorder = () => {

    const {
        permission,
        recordingStatus,
        liveVideoFeed,
        recordedVideo,
        getCameraPermission,
        stopCameraPermission,
        startRecording,
        stopRecording,
        onSendServer
    } = useScreenRecord();

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
                        <button onClick={() => stopRecording()} type="button">
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
                    {/* @ts-ignore */}
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
