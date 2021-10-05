import React, { useRef } from "react";
import useScreenRecorder from "use-screen-recorder";
import Button from "@material-ui/core/Button"

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

    
    function handleUpload() {
         console.log(blobUrl);
    }

    return (
        <div>
            
            <h1 className='elegantshadow'>Screen Recorder</h1>
            <div className='status'>
                Status: {status}<br /><br />
                Video Link: {blobUrl || "Waiting..."}
            </div>
            <div>
                <video
                    ref={videoRef}
                    src={blobUrl}
                    controls
                    autoPlay
                />
            </div>
            <div className='buttons'>
                {(status === "idle" || status === "error") && (
                    <Button onClick={startRecording} variant='contained' color='primary' >Start recording</Button>
                )}
                {(status === "recording" || status === "paused") && (
                    <Button onClick={stopRecording} variant='contained' color='primary'>Stop recording</Button>
                )}{' '}
                {(status === "recording" || status === "paused") && (
                    <Button
                        onClick={() =>
                            status === "paused" ? resumeRecording() : pauseRecording()
                        }
                        variant='contained' color='primary'
                    >
                        {status === "paused" ? "Resume recording" : "Pause recording"}
                    </Button>
                )}
                {status === "stopped" && (
                    <Button
                        onClick={() => {
                            resetRecording();
                            videoRef.current.load();
                        }}
                        variant='contained' color='primary'
                    >
                        Reset recording
                    </Button>
                     
                )}{' '}
                {status === "stopped" && (
                    <Button
                        onClick={handleUpload}
                        variant='contained' color='primary'
                    >
                        Upload Recording
                    </Button>
                     
                )}
            </div>
        </div>
    )
} export default Recorder;
