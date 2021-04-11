import "./Main.css";
import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const Main = () => {
    const webcamRef: any = React.useRef(new Object());
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
      },
      [webcamRef]
    );

    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className="nav-title">
                    Gesture Recognition Shortcuts
                    <IconButton href="./options.html" target="_blank">
                        <SettingsIcon />
                    </IconButton>
                </Typography>
                
                </Toolbar>
            </AppBar>
        
            <Webcam
                audio={false}
                height={480}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={852}
                videoConstraints={videoConstraints}
            />
            <Button variant="contained" color="primary" onClick={capture}>Capture photo</Button>
        </div>
    );
}

export default Main;
