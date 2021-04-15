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
    const [response, setResponse] = React.useState({});

    const mapPredictionToTopSite = (classes: string) => {
        if (classes !== undefined || !classes) {
            chrome.topSites.get((urls: chrome.topSites.MostVisitedURL[]) => {
                let predictedClass = classes.split(",")[0]
                let index: number = gestureImages.indexOf(predictedClass);

                if (index >= 0) {
                    let selectedUrl: string = urls[index].url;
                    chrome.tabs.create({ 'url': selectedUrl }, function (tab) {
                        console.log("Opened tab with URL: " + selectedUrl);
                    });
                }
            });
        }
    }

    const capture = React.useCallback(
        async () => {
            const imageSrc = webcamRef.current.getScreenshot();
            const response: any = await fetch('https://m1a0t3w3ng.execute-api.us-east-1.amazonaws.com/dev/predict', {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'image/jpeg'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: imageSrc // body data type must match "Content-Type" header
            }).catch((err) => console.log(err));
            if (response !== undefined || response !== '') {
                const body: any = response.json().then((res: any) => {
                    console.log(res);
                    if (res !== undefined || !res) {
                        const instanceClass: any = res.classes?.split(",")[0];
                        mapPredictionToTopSite(instanceClass);
                    }

                });
            }

            setResponse(response as Object);
        },
        [webcamRef]
    );

    React.useEffect(() => {
        const run = async (interval: any) => {
            try {
                let last = new Date().getTime();

                (function loop() {
                    const
                        now = new Date().getTime(),
                        delta = now - last;

                    if (delta >= interval) {
                        capture();
                        last = now;
                    }

                    window.requestAnimationFrame(loop);
                })();


            } catch (err) {
                console.log('something went wrong');
                console.error(err);
            }
        }
        run(5000);
    })

    return (
        <div className="popup-container">
            <div className="popup-header">
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
            </div>
            <div className="cam-container">
                <div className="flex-100">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </div>
                <div className="flex-100">
                    <Button variant="contained" color="primary" onClick={capture}>Capture photo</Button>
                </div>
            </div>
        </div >
    );
}

export default Main;