import { useRef, useState } from "react";

import useVideoRecord from "../hooks/useVideoRecord";

const mimeType = "video/webm";

const VideoRecorder = () => {
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [videoChunks, setVideoChunks] = useState([]);

    const mediaRecorder = useRef(null);
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<unknown>(null);
    const [recordedVideo, setRecordedVideo] = useState(null);

    const liveVideoFeed = useRef({ srcObject: null });
    // const { permission, setPermission, stream, recordedVideo, setRecordedVideo, liveVideoFeed, getCameraPermission } = useVideoRecord();
    console.log({ permission, stream });

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const audioConstraints = { audio: true };
                const videoConstraints = {
                    audio: false,
                };
                const displayMediaOptions = {
                    video: true, 
                    audio: true,
                    displaySurface: "monitor"
                    // audio: {
                    //     suppressLocalAudioPlayback: false,
                    // },
                    // preferCurrentTab: false,
                    // selfBrowserSurface: "exclude",
                    // systemAudio: "include",
                    // surfaceSwitching: "include",
                    // monitorTypeSurfaces: "include",
                };
                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                // const videoStream = await navigator.mediaDevices.getUserMedia(
                //     videoConstraints
                // );
                const videoStream = await navigator.mediaDevices.getDisplayMedia(
                    displayMediaOptions
                );

                setPermission(true);
                //combine both audio and video streams
                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);
                setStream(combinedStream);
                //set videostream to live feed player
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const stopCameraPermission = () => {
        setPermission(false);
        liveVideoFeed.current.srcObject = null
    }

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localVideoChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        setVideoChunks(localVideoChunks);
    };

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);
            setRecordedVideo(videoUrl);
            setVideoChunks([]);
        };
    };

    return (
        <div>
            <h2>Video Recorder</h2>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <button onClick={getCameraPermission} type="button">
                            Get Camera
                        </button>
                    ) : <button onClick={stopCameraPermission} type="button">
                        Stop Camera
                    </button>}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <button onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}
                </div>
                {/* {audio ? ( */}
                <div className="audio-player">
                    {
                        // liveVideoFeed.current?>.srcObject &&
                        <video ref={liveVideoFeed} autoPlay muted style={{ maxWidth: "50vw", maxHeight: "50vh" }}></video>
                    }
                    <a download href={recordedVideo}>
                        Download Recording
                    </a>
                </div>
                {/* ) : null} */}
            </main>
        </div>
    );
};
export default VideoRecorder;
