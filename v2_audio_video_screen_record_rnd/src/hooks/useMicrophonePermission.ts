import { useState } from "react";

const useMicrophonePermission = () => {

    const [permission, setPermission] = useState(false);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                console.log({streamData})
                setPermission(true);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    return [permission, getMicrophonePermission];
}

export default useMicrophonePermission;