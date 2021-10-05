import React, { useRef, useState } from "react";
import useScreenRecorder from "use-screen-recorder";
import Button from "@material-ui/core/Button"

function Recorder() {
    const videoRef = useRef();
    // const [video, setVideo] = useState();

    const {
        blobUrl,
        pauseRecording,
        resetRecording,
        resumeRecording,
        startRecording,
        status,
        stopRecording,
    } = useScreenRecorder({ audio: true });

    
    
    async function handleVideo() {
        let blob = await fetch(blobUrl).then(r => r.blob());
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            var base64data = reader.result;
            handleUpload(base64data);
        }
    }
    async function handleUpload(video) {
    try {
        fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({ data: video }),
            headers: { "Content-Type": "application/json" },
        })
        // .then((response) => {
        //     console.log("response", name, response.status)
        //     response.json().then((data) => {
        //         cardurl.push(data.data);
        //         // console.log("cardurl", cardurl)
        //         setupCard(cardurl)
        //     });
        // });
    } catch (error) {
        console.error(error);
    }
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
                        onClick={handleVideo}
                        variant='contained' color='primary'
                    >
                        Upload Recording
                    </Button>

                )}
            </div>
        </div>
    )
} export default Recorder;
