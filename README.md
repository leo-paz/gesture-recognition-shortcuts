
# Gesture Recognition Shortcuts


## Team Members

Leonardo Paz

Sai Janjanam

Lyndon Lo


# Summary

Our project will consist of training a neural network to detect a set of common hand gestures that the user can map to any keyboard shortcut they want. This neural network will be able to do real time inference from sampling a camera feed and be able to detect multiple gestures in the same image to combine shortcuts. There will additionally be a tool that allows a user to configure hand gestures to keyboard shortcuts intuitively.


# Background

There have been large advancements in neural network architectures for object detection that make state of the art object detection accessible for most developers. Frameworks like PyTorch give developers tools to build powerful deep learning models that can be applied to computer vision. There are even higher level of abstractions like Detectron2 which is Facebook’s deep learning framework built on top of PyTorch. The idea is that they give a variety of neural network architectures for different computer vision tasks (object detection, recognition, segmentation) which are pretrained. These pre-trained models can then be used for transfer learning to detect new objects of our liking.

 \
The training phase will be a lot of hyper parameter tuning of the neural network to squeeze out as much average precision (AP) and average recall (AR) out of trained model as possible.Once the hyper parameters such as kernel size, error function, filtering, image rotation techniques, learning rate, region proposals, etc are settled on, we will have to write an inference script that will be able to run CPU inference as this is more available although GPU inference is more efficient. This inference script will load a pre trained model and accept a pre-processed image and spit out the classes we have trained for detection. These images will be sampled from the camera and an arbitrary rate and sent to our model for inference.


# The Challenge

This problem is challenging because it involves knowledge bases from two areas of computer science: computer vision and artificial intelligence. Artificial intelligence will be used to aid in image recognition and classification so that we can understand the gesture captured through the camera feed and map it to the correct shortcut. We will be using the Open CV and Detectron 2 to solve this problem.


# Goals and Deliverables

The goal of this project is to produce an app that detects hand signs and gestures from users and bind the hand gestures to keyboard shortcuts. We plan on having a complete app at the end of this project that can achieve that. To be considered a successful project, the basic functionalities of the app must be present such as detecting hand signs, and allowing users to configure hand signs to keyboard shortcuts. If the project goes well and there is extra time left we plan on exploring motion tracking of hand movements. Movements such as swiping in a certain direction may give a better user experience. We are confident that we can finish the scheduled tasks within the allotted time frame.


# Schedule 

**Feb 6:**

Sai: Research motion tracking, object detection 

Leo: Research motion tracking, object detection 

Lyndon: Research motion tracking, object detection 

**Feb 13:**

Sai: Learn about Pytorch and Detectron 2

Leo: Learn about Pytorch and Detectron 2

Lyndon: Learn about Pytorch and Detectron 2

**Feb 20:**

Sai: Gather images for training and annotation

Leo: Implement preprocessing procedure for training sets

Lyndon: Gather image for training and annotation

**Feb 27:**

Sai: Run training loop script

Leo: Hyper parameter tuning

Lyndon: Evaluation loop script

**Mar 6:**

Sai: Implement the preprocessing of the video feed from webcam before it is given the model 

Leo: Implement configuration feature for the client so that the user can choose which gesture can map to which key shortcut 

Lyndon: Implement client for mapping object detection results to key map

**Mar 13:**

Sai: Testing and fix bugs

Leo: Testing and fix bugs

Lyndon: Testing and fix bugs

**Mar 20:**

Sai: Add the ability for the user to map a motion gesture to key map and refactor code to implement results from model and motion tracking procedure

Leo: Implement procedure to identity motion by analyzing object and position across a number of frames

Lyndon: Implement motion tracking with Open CV

**Mar 27:**

Sai: Implement the GUI for gesture configuration

Leo: Implement the GUI for camera view port for object detection feedback

Lyndon: Implement the GUI for gesture configuration

**April 3:**

Sai: Testing and fix bugs

Leo: Testing and fix bugs

Lyndon: Testing and fix bugs
