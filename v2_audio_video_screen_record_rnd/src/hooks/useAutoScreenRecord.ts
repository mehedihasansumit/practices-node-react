import axios from "axios";
import { useRef, useState } from "react";
// import browserCheck from "../lib/browserCheck";
import noOfScreens from '../lib/noOfScreens';
const mimeType = "video/webm";

async function browserCheck() {
    console.log({ userAgent: navigator.userAgent })
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) return 'opera';
    if (navigator.userAgent.indexOf("Edg") != -1) return 'Edge';
    if (navigator?.brave && await navigator.brave.isBrave() || false) return 'brave';
    if (navigator.userAgent.indexOf("Chrome") != -1) return 'chrome';
    if (navigator.userAgent.indexOf("Safari") != -1) return 'safari';
    if (navigator.userAgent.indexOf("Firefox") != -1) return 'firefox';
    if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) return 'ie';
    return null;
}

const useAutoScreenRecord = () => {

    const [permission, setPermission] = useState(false);

    const mediaRecorder = useRef<any>(null);
    const liveVideoFeed = useRef<any>({ srcObject: null });
    const videoChunks = useRef([]);
    const videoBlob = useRef<any>(null);

    console.log({ permission, liveVideoFeed });


    const getCameraPermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                console.log({screen_details : await noOfScreens()})
                console.log({ findOutBrowser : await browserCheck() })

                const audioConstraints = {
                    audio: true
                    // {
                    //     echoCancellation: true,
                    //     noiseSuppression: true,
                    //     sampleRate: 44100
                    // }
                };

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
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );

                const displaySteam = await navigator.mediaDevices.getDisplayMedia(
                    // @ts-ignore
                    displayMediaOptions
                );


                // only work with chrome, brave
                // @ts-ignore
                displaySteam.oninactive = (res) => {
                    console.log("inactive");

                    setPermission(false);

                    // stop recording and send throw api
                    stopRecording(onSendServer);
                };
                const videoTrack = displaySteam.getVideoTracks()[0];

                //  working with chrome, brave, mozila firefox, 
                videoTrack.onended = () => {
                    console.log('Screen share stopped');
                    setPermission(false);

                    // stop recording and send throw api
                    stopRecording(onSendServer);
                };

                //combine both audio and display streams
                const combinedStream = new MediaStream([
                    ...displaySteam.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);

                setPermission(true);
                liveVideoFeed.current.srcObject = combinedStream;

                // start recording
                startRecording(combinedStream);

            } catch (err) {
                // @ts-ignore
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async (displaySteam: any) => {
        // setRecordingStatus("recording");
        const media = new MediaRecorder(displaySteam, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localVideoChunks = <any>[];
        mediaRecorder.current.ondataavailable = (event: any) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        videoChunks.current = localVideoChunks;
    };

    const stopRecording = (cb?: () => void) => {
        setPermission(false);
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const videoBlob_ = new Blob(videoChunks.current, { type: mimeType });
            // const videoUrl = URL.createObjectURL(videoBlob_);
            videoBlob.current = videoBlob_;
            videoChunks.current = [];
            console.log({ cb })
            if (cb) cb();
        };
    };

    const onSendServer = () => {
        // const blob = new Blob(recordedVideo, { type: mimeType });
        const file = new File([videoBlob.current], "test2.webm", { type: mimeType });
        const form = new FormData();
        form.append("avatar", file)
        axios.post('http://localhost:3000/profile', form)
        console.log("send with api...");
        videoBlob.current = null;
    }

    return {
        permission,
        liveVideoFeed,
        getCameraPermission,
    }


}

export default useAutoScreenRecord;