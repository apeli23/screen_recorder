import React, { useRef } from "react";
import useScreenRecorder from "use-screen-recorder";

function Recorder() {
    const videoRef = useRef();

    const {
        blobUrl,
        pauseRecording,
        resetRecording,
        resumeRecording,
        startRecording,
        status,
        stopRecording,
    } = useScreenRecorder({ audio: true });

    return (
        <div>
            <h1 className='elegantshadow'>Screen Recorder</h1>
            <div className='status'>
                Status: {status}<br/><br/>
                Video Link: {blobUrl || "Waiting..."}
            </div>
        </div>
    )
} export default Recorder;
