import axios from "axios";
import { SetStateAction, useRef, useState } from "react";

const mimeType = "video/webm";

const useScreenRecord = () => {

    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [videoChunks, setVideoChunks] = useState<any[]>([]);
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<any>(null);
    const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

    const mediaRecorder = useRef<any>(null);
    const liveVideoFeed = useRef<any>({ srcObject: null });
    const videoBlob = useRef<any>(null);

    console.log({ permission, videoChunks, stream, mediaRecorder, liveVideoFeed, recordedVideo });

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const displayMediaOptions = {
                    video: {
                        displaySurface: "monitor"
                    },
                    audio: {
                        suppressLocalAudioPlayback: false,
                    },
                    preferCurrentTab: false,
                    selfBrowserSurface: "exclude",
                    systemAudio: "include",
                    surfaceSwitching: "include",
                    monitorTypeSurfaces: "include",
                };
                // create record stream
                const displaySteam = await navigator.mediaDevices.getDisplayMedia(
                    // @ts-ignore
                    displayMediaOptions
                );

                setPermission(true);
                //combine both audio and video streams
                const combinedStream = new MediaStream([
                    ...displaySteam.getVideoTracks(),
                ]);
                setStream(combinedStream);
                //set videostream to live feed player
                liveVideoFeed.current.srcObject = displaySteam;

            } catch (err) {
                // @ts-ignore
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
        let localVideoChunks: SetStateAction<any[]> = [];
        mediaRecorder.current.ondataavailable = (event: any) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        console.log({localVideoChunks})
        setVideoChunks(localVideoChunks);
    };

    const stopRecording = (cb?: () => void) => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const videoBlob_ = new Blob(videoChunks, { type: mimeType });
            console.log({videoBlob})
            const videoUrl = URL.createObjectURL(videoBlob_);
            videoBlob.current = videoBlob_;
            setRecordedVideo(videoUrl);
            setVideoChunks([]);
            if (cb) cb();
        };
    };

    const onSendServer = () => {
        const file = new File([videoBlob.current], "test.webm", { type: mimeType });
        const form = new FormData();
        form.append("avatar", file)
        axios.post('http://localhost:3000/profile', form)
        console.log("clicked...")
    }

    return { permission, videoBlob, mediaRecorder, recordingStatus, liveVideoFeed, recordedVideo, getCameraPermission, stopCameraPermission, startRecording, stopRecording, onSendServer }


}

export default useScreenRecord;