import "./Options.css"
import * as React from "react";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";

const Options = () => {
    const gestureImages = ["c.png", "down.png", "fist_moved.png", "fist.png", "index.png", "l.png", "ok.png", "palm_moved.png", "palm.png", "thumb.png"]

    const gotMedia = (mediaStream: any) => {
        const mediaStreamTrack = mediaStream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        console.log(imageCapture);
    }

    const onEnableWebcamClick = () => {
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
          .then(gotMedia)
          .catch(error => console.error('getUserMedia() error:', error));
    }

    const gestureImagesMap = (value: string, index: number) => {
        return (
            <li>
                <img width={100} height={100} src={"./gestures/" + value} />
                <p>TopSite #{index + 1}</p>
            </li>
        );
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

            <Button variant="contained" color="primary" onClick={onEnableWebcamClick}>Enable Webcam</Button>

            <h3>Gestures Mappings</h3>
            <ol>
                {gestureImages.map(gestureImagesMap)}
            </ol>

        </div>
    );
}

export default Options;