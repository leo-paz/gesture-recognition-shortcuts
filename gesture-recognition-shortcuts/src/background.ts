// This file is ran as a background script
console.log("Hello from background script!");

const gotMedia = (mediaStream: any) => {
    console.log("Hi2");
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);
    console.log(imageCapture);
}

const popupOpen = () => {
    console.log("Hi1");
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(gotMedia)
      .catch(error => console.error('getUserMedia() error:', error));
};

export { popupOpen };