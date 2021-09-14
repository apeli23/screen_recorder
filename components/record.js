import React, { useRef } from "react";
import useScreenRecorder from "use-screen-recorder";
import Pill from "./pill";

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
        <div id="container">
            <div className="wrapper">
                <div className="pills">
                    <Pill title="Status" value={status} />
                    <Pill
                        style={{ flexGrow: 1 }}
                        title="Blob URL"
                        value={blobUrl || "Waiting..."}
                    />
                </div>
                <div>
                    <video
                        ref={videoRef}
                        src={blobUrl}
                        poster={process.env.PUBLIC_URL + "/poster.png"}
                        controls
                        autoPlay
                    />
                </div>

                <div className="buttons">
                    {(status === "idle" || status === "error") && (
                        <button onClick={startRecording}>Start recording</button>
                    )}
                    {(status === "recording" || status === "paused") && (
                        <button onClick={stopRecording}>Stop recording</button>
                    )}
                    {(status === "recording" || status === "paused") && (
                        <button
                            onClick={() =>
                                status === "paused" ? resumeRecording() : pauseRecording()
                            }
                        >
                            {status === "paused" ? "Resume recording" : "Pause recording"}
                        </button>
                    )}
                    {status === "stopped" && (
                        <button
                            onClick={() => {
                                resetRecording();
                                videoRef.current.load();
                            }}
                        >
                            Reset recording
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
} export default Recorder;