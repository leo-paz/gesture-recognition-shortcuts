
# Gesture Recognition Shortcuts

# Summary

Our project will consist of training a neural network to detect a set of common hand gestures that the user can map to any keyboard shortcut they want. This neural network will be able to do real time inference from sampling a camera feed and be able to detect multiple gestures in the same image to combine shortcuts. There will additionally be a tool that allows a user to configure hand gestures to keyboard shortcuts intuitively.


![alt_text](https://github.com/leo-paz/gesture-recognition-shortcuts/blob/main/readme-diagram.png?raw=true)

# How to run the code
To build and run the Chrome extension follow these steps
1. Using command line or terminal navigate to "gesture-recognition-shortcuts" inside the project directory
2. run "npm install" and then "npm run build" (make sure you have node.js installed)
3. Open the chrome browser and navigate to "chrome://extensions"
4. Toggle "Developer mode" on the top right
5. Then click "Load Unpacked" and upload the "dist" folder in the "gesture-recognition-shortcuts" folder inside thr project directory
6. Then click on the extension icon and click the settings icon button
7. In the options page click "Enable Webcam" and give permission for the extension to use your webcam
8. Click on the extension again and you will see you webcam feed

# Run Model
Navigate to the Jupyter Notebook directory for instructions on how we trained the model

