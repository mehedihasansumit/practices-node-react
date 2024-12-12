import axios from "axios";
import { useEffect, useRef, useState } from "react";

const mimeType = "video/webm";

const useScreenRecord = () => {

    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [videoChunks, setVideoChunks] = useState([]);
    const [videoBlob, setVideoBlob] = useState();
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<unknown>(null);
    const [recordedVideo, setRecordedVideo] = useState(null);

    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef({ srcObject: null });


    const [autoRecordBlob, setAutoRecordBlob] = useState();
    const [storeRecord, setStoreRecord] = useState(false);

    // const { permission, setPermission, stream, recordedVideo, setRecordedVideo, liveVideoFeed, getCameraPermission } = useVideoRecord();
    console.log({ permission, videoChunks, stream, mediaRecorder, liveVideoFeed, recordedVideo });

    useEffect(() => {
        if (!storeRecord) return;

        const videoBlob = new Blob(videoChunks, { type: mimeType });

        const file = new File([videoBlob], "yourfilename.webm", { type: mimeType });
        console.log({ file })
        const form = new FormData();
        form.append("avatar", file)
        axios.post('http://localhost:3000/profile', form)
        console.log("clicked...22")
        
        setStoreRecord(false);
    }, [storeRecord])

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const audioConstraints = { audio: true };
                const videoConstraints = {
                    audio: false,
                };
                const displayMediaOptions = {
                    video: {
                        displaySurface: "monitor"
                    },
                    audio: true,
                    // displaySurface: "monitor"
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
                    {
                        video: {
                            displaySurface: "monitor"
                        }
                    }
                );
                videoStream.onactive = () => {
                    console.log("active");
                    // setPermission(false);
                }
                videoStream.oninactive = (res) => {
                    console.log("inactive", res);
                    setStoreRecord(true);
                    setPermission(false);
                }
                console.log({ videoStream })
                setPermission(true);
                //combine both audio and video streams
                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);
                setStream(combinedStream);
                //set videostream to live feed player
                liveVideoFeed.current.srcObject = videoStream;



                // auto record 
                const media = new MediaRecorder(combinedStream, { mimeType });
                mediaRecorder.current = media;
                mediaRecorder.current.start();
                let localVideoChunks = [];
                mediaRecorder.current.ondataavailable = (event) => {
                    if (typeof event.data === "undefined") return;
                    if (event.data.size === 0) return;
                    localVideoChunks.push(event.data);
                };
                setVideoChunks(localVideoChunks);
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

    const stopRecording = (cb?: () => void) => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        console.log({ videoChunks })
        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);
            setVideoBlob(videoBlob);
            setRecordedVideo(videoUrl);
            setVideoChunks([]);
            console.log({ cb })
            if (cb) cb();
        };
    };

    return { permission, videoBlob, stream, mediaRecorder, recordingStatus, liveVideoFeed, recordedVideo, getCameraPermission, stopCameraPermission, startRecording, stopRecording }


}

export default useScreenRecord;