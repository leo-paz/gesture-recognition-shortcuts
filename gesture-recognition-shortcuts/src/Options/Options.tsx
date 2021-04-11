import "./Options.css"
import * as React from "react";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";

const Options = () => {
    const gotMedia = (mediaStream: any) => {
        console.log("Hi2");
        const mediaStreamTrack = mediaStream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        console.log(imageCapture);
    }

    const onEnableWebcamClick = () => {
        console.log("Hi1");
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
          .then(gotMedia)
          .catch(error => console.error('getUserMedia() error:', error));
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="nav-title">
                        Gesture Recognition Shortcuts Options
                    </Typography>
                </Toolbar>
            </AppBar>

            <Button onClick={onEnableWebcamClick}>Enable Webcam</Button>
        </div>
    );
}

export default Options;