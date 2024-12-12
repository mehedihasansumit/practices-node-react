import useAutoScreenRecord from "../hooks/useAutoScreenRecord";

const AutoScreenRecorder = () => {

    const {
        permission,
        liveVideoFeed,
        getCameraPermission,
    } = useAutoScreenRecord();


    return (
        <div>
            <h2>Auto Screen Recorder</h2>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <button onClick={getCameraPermission} type="button">
                            Get Screen
                        </button>
                    ) : null}
                </div>
                <div className="audio-player" style={{display:""}}>
                    {
                        <video ref={liveVideoFeed} autoPlay muted style={{ maxWidth: "50vw", maxHeight: "50vh" }}></video>
                    }
                </div>
            </main>
        </div>
    );
};
export default AutoScreenRecorder;
