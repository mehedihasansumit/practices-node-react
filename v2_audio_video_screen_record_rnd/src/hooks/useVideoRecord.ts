import { useRef, useState } from "react";

const useVideoRecord = () => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<unknown>(null);
    const [recordedVideo, setRecordedVideo] = useState(null);

    const liveVideoFeed = useRef({ srcObject: null });

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };
                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                const videoStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
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

    return { permission, setPermission, stream, recordedVideo, setRecordedVideo, liveVideoFeed, getCameraPermission } as const;
}

export default useVideoRecord;