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
    const gestureImages = ["c", "down", "fist_moved", "fist", "index", "l", "ok", "palm_moved", "palm", "thumb"]
    const webcamRef: any = React.useRef(new Object());
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
      },
      [webcamRef]
    );

    const mapPredictionToTopSite = (classes: string) => {
        chrome.topSites.get((urls: chrome.topSites.MostVisitedURL[]) => {
            let predictedClass = classes.split(",")[0]
            let index: number = gestureImages.indexOf(predictedClass);

            if (index >= 0) {
                let selectedUrl: string = urls[index].url;
                chrome.tabs.create({'url': selectedUrl}, function(tab) {
                    console.log("Opened tab with URL: " + selectedUrl);
                });
            }   
        });
    }

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
                <select name="" id=""></select>
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